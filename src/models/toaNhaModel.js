const db = require('../config/db.config');

const ToaNhaModel = {
    // Lấy tất cả tòa nhà
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM toanha');
        return rows;
    },

    // Lấy tòa nhà theo ID
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM toanha WHERE id = ?', [id]);
        return rows[0];
    },

    // Lấy tòa nhà theo mã
    getByMa: async (MaToaNha) => {
        const [rows] = await db.query('SELECT * FROM toanha WHERE MaToaNha = ?', [MaToaNha]);
        return rows[0];
    },

    // Tạo tòa nhà mới
    create: async (data) => {
        const { MaToaNha, TenToaNha, SoLuongPhong } = data;
        const [result] = await db.query(
            'INSERT INTO toanha (MaToaNha, TenToaNha, SoLuongPhong) VALUES (?, ?, ?)',
            [MaToaNha, TenToaNha, SoLuongPhong || 0]
        );
        return result.insertId;
    },

    // Cập nhật tòa nhà
    update: async (id, data) => {
        const { MaToaNha, TenToaNha, SoLuongPhong } = data;
        const [result] = await db.query(
            'UPDATE toanha SET MaToaNha = ?, TenToaNha = ?, SoLuongPhong = ? WHERE id = ?',
            [MaToaNha, TenToaNha, SoLuongPhong, id]
        );
        return result.affectedRows;
    },

    // Xóa tòa nhà
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM toanha WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = ToaNhaModel;
