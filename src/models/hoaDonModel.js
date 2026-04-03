const db = require('../config/db.config');

const HoaDonModel = {
    // Lấy tất cả hóa đơn
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT hd.*, p.SoPhong 
            FROM hoadon hd 
            LEFT JOIN phong p ON hd.MaPhong = p.MaPhong
            ORDER BY hd.NgayTao DESC
        `);
        return rows;
    },

    // Lấy hóa đơn theo MaHoaDon
    getById: async (MaHoaDon) => {
        const [rows] = await db.query(`
            SELECT hd.*, p.SoPhong 
            FROM hoadon hd 
            LEFT JOIN phong p ON hd.MaPhong = p.MaPhong
            WHERE hd.MaHoaDon = ?
        `, [MaHoaDon]);
        return rows[0];
    },

    // Lấy hóa đơn theo phòng
    getByPhong: async (MaPhong) => {
        const [rows] = await db.query('SELECT * FROM hoadon WHERE MaPhong = ? ORDER BY NgayTao DESC', [MaPhong]);
        return rows;
    },

    // Lấy hóa đơn theo trạng thái
    getByTrangThai: async (TrangThai) => {
        const [rows] = await db.query('SELECT * FROM hoadon WHERE TrangThai = ?', [TrangThai]);
        return rows;
    },

    // Tạo hóa đơn mới
    create: async (data) => {
        const { MaHoaDon, MaPhong, ThangThu, TongTien, TrangThai, NgayTao, HanDongTien } = data;
        const [result] = await db.query(
            'INSERT INTO hoadon (MaHoaDon, MaPhong, ThangThu, TongTien, TrangThai, NgayTao, HanDongTien) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [MaHoaDon, MaPhong, ThangThu, TongTien || 0, TrangThai || 'Chưa thanh toán', NgayTao || new Date(), HanDongTien]
        );
        return result.affectedRows;
    },

    // Cập nhật hóa đơn
    update: async (MaHoaDon, data) => {
        const { TongTien, TrangThai, HanDongTien } = data;
        const [result] = await db.query(
            'UPDATE hoadon SET TongTien = ?, TrangThai = ?, HanDongTien = ? WHERE MaHoaDon = ?',
            [TongTien, TrangThai, HanDongTien, MaHoaDon]
        );
        return result.affectedRows;
    },

    // Cập nhật trạng thái thanh toán
    updateTrangThai: async (MaHoaDon, TrangThai) => {
        const [result] = await db.query('UPDATE hoadon SET TrangThai = ? WHERE MaHoaDon = ?', [TrangThai, MaHoaDon]);
        return result.affectedRows;
    },

    // Xóa hóa đơn
    delete: async (MaHoaDon) => {
        const [result] = await db.query('DELETE FROM hoadon WHERE MaHoaDon = ?', [MaHoaDon]);
        return result.affectedRows;
    }
};

module.exports = HoaDonModel;
