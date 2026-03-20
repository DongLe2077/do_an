const db = require('../config/db.config');

const ChiTietHoaDonModel = {
    // Lấy chi tiết theo hóa đơn
    getByHoaDon: async (HoaDon_id) => {
        const [rows] = await db.query(
            'SELECT * FROM chitiethoadon WHERE HoaDon_id = ?',
            [HoaDon_id]
        );
        return rows;
    },

    // Lấy chi tiết theo ID
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM chitiethoadon WHERE id = ?', [id]);
        return rows[0];
    },

    // Tạo 1 dòng chi tiết
    create: async (data) => {
        const { HoaDon_id, TenDichVu, SoLuong, DonGia, ThanhTien, GhiChu } = data;
        const thanhTien = ThanhTien || (SoLuong * DonGia);
        const [result] = await db.query(
            'INSERT INTO chitiethoadon (HoaDon_id, TenDichVu, SoLuong, DonGia, ThanhTien, GhiChu) VALUES (?, ?, ?, ?, ?, ?)',
            [HoaDon_id, TenDichVu, SoLuong || 1, DonGia || 0, thanhTien, GhiChu || null]
        );
        return result.insertId;
    },

    // Tạo nhiều dòng chi tiết cùng lúc
    createMany: async (HoaDon_id, items) => {
        if (!items || items.length === 0) return [];

        const values = items.map(item => {
            const thanhTien = item.ThanhTien || ((item.SoLuong || 1) * (item.DonGia || 0));
            return [HoaDon_id, item.TenDichVu, item.SoLuong || 1, item.DonGia || 0, thanhTien, item.GhiChu || null];
        });

        const placeholders = values.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');
        const flatValues = values.flat();

        const [result] = await db.query(
            `INSERT INTO chitiethoadon (HoaDon_id, TenDichVu, SoLuong, DonGia, ThanhTien, GhiChu) VALUES ${placeholders}`,
            flatValues
        );
        return result;
    },

    // Tính tổng tiền theo hóa đơn
    getTongTien: async (HoaDon_id) => {
        const [rows] = await db.query(
            'SELECT COALESCE(SUM(ThanhTien), 0) as TongTien FROM chitiethoadon WHERE HoaDon_id = ?',
            [HoaDon_id]
        );
        return rows[0].TongTien;
    },

    // Xóa 1 dòng chi tiết
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM chitiethoadon WHERE id = ?', [id]);
        return result.affectedRows;
    },

    // Xóa tất cả chi tiết của 1 hóa đơn
    deleteByHoaDon: async (HoaDon_id) => {
        const [result] = await db.query('DELETE FROM chitiethoadon WHERE HoaDon_id = ?', [HoaDon_id]);
        return result.affectedRows;
    }
};

module.exports = ChiTietHoaDonModel;
