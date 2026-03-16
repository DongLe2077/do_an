const db = require('../config/db.config');

const HoaDonModel = {
    // Lấy tất cả hóa đơn
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT hd.*, p.SoPhong 
            FROM hoadon hd 
            LEFT JOIN phong p ON hd.Phong_id = p.id
            ORDER BY hd.NgayTao DESC
        `);
        return rows;
    },

    // Lấy hóa đơn theo ID
    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT hd.*, p.SoPhong 
            FROM hoadon hd 
            LEFT JOIN phong p ON hd.Phong_id = p.id
            WHERE hd.id = ?
        `, [id]);
        return rows[0];
    },

    // Lấy hóa đơn theo phòng
    getByPhong: async (Phong_id) => {
        const [rows] = await db.query('SELECT * FROM hoadon WHERE Phong_id = ? ORDER BY NgayTao DESC', [Phong_id]);
        return rows;
    },

    // Lấy hóa đơn theo trạng thái
    getByTrangThai: async (TrangThai) => {
        const [rows] = await db.query('SELECT * FROM hoadon WHERE TrangThai = ?', [TrangThai]);
        return rows;
    },

    // Tạo hóa đơn mới
    create: async (data) => {
        const { MaHoaDon, ThangThu, Phong_id, TongTien, TrangThai, NgayTao, HanDongTien } = data;
        const [result] = await db.query(
            'INSERT INTO hoadon (MaHoaDon, ThangThu, Phong_id, TongTien, TrangThai, NgayTao, HanDongTien) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [MaHoaDon, ThangThu, Phong_id, TongTien, TrangThai || 'chuathanhtoan', NgayTao || new Date(), HanDongTien]
        );
        return result.insertId;
    },

    // Cập nhật hóa đơn
    update: async (id, data) => {
        const { TongTien, TrangThai, HanDongTien } = data;
        const [result] = await db.query(
            'UPDATE hoadon SET TongTien = ?, TrangThai = ?, HanDongTien = ? WHERE id = ?',
            [TongTien, TrangThai, HanDongTien, id]
        );
        return result.affectedRows;
    },

    // Cập nhật trạng thái thanh toán
    updateTrangThai: async (id, TrangThai) => {
        const [result] = await db.query('UPDATE hoadon SET TrangThai = ? WHERE id = ?', [TrangThai, id]);
        return result.affectedRows;
    },

    // Xóa hóa đơn
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM hoadon WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = HoaDonModel;
