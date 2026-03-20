const db = require('../config/db.config');

const DanhSachDichVuModel = {
    // Lấy tất cả dịch vụ
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM danhsachdichvu');
        return rows;
    },

    // Lấy dịch vụ theo ID
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM danhsachdichvu WHERE id = ?', [id]);
        return rows[0];
    },

    // Lấy dịch vụ theo mã
    getByMa: async (MaDichVu) => {
        const [rows] = await db.query('SELECT * FROM danhsachdichvu WHERE MaDichVu = ?', [MaDichVu]);
        return rows[0];
    },

    // Tạo dịch vụ mới
    create: async (data) => {
        const { MaDichVu, TenDichVu, DonGia } = data;
        const [result] = await db.query(
            'INSERT INTO danhsachdichvu (MaDichVu, TenDichVu, DonGia) VALUES (?, ?, ?)',
            [MaDichVu, TenDichVu, DonGia]
        );
        return result.insertId;
    },

    // Cập nhật dịch vụ
    update: async (id, data) => {
        const { TenDichVu, DonGia } = data;
        const [result] = await db.query(
            'UPDATE danhsachdichvu SET TenDichVu = ?, DonGia = ? WHERE id = ?',
            [TenDichVu, DonGia, id]
        );
        return result.affectedRows;
    },

    // Xóa dịch vụ
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM danhsachdichvu WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = DanhSachDichVuModel;
