const db = require('../config/db.config');

const PhongModel = {
    // Lấy tất cả phòng
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT p.*, t.TenToaNha 
            FROM phong p 
            LEFT JOIN toanha t ON p.ToaNha_id = t.id
        `);
        return rows;
    },

    // Lấy phòng theo ID
    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT p.*, t.TenToaNha 
            FROM phong p 
            LEFT JOIN toanha t ON p.ToaNha_id = t.id
            WHERE p.id = ?
        `, [id]);
        return rows[0];
    },

    // Lấy phòng theo tòa nhà
    getByToaNha: async (ToaNha_id) => {
        const [rows] = await db.query('SELECT * FROM phong WHERE ToaNha_id = ?', [ToaNha_id]);
        return rows;
    },

    // Tạo phòng mới
    create: async (data) => {
        const { MaPhong, SoPhong, ToaNha_id, TrangThai, DienTich } = data;
        const [result] = await db.query(
            'INSERT INTO phong (MaPhong, SoPhong, ToaNha_id, TrangThai, DienTich) VALUES (?, ?, ?, ?, ?)',
            [MaPhong, SoPhong, ToaNha_id, TrangThai || 'trong', DienTich]
        );
        return result.insertId;
    },

    // Cập nhật phòng
    update: async (id, data) => {
        const { SoPhong, ToaNha_id, TrangThai, DienTich } = data;
        const [result] = await db.query(
            'UPDATE phong SET SoPhong = ?, ToaNha_id = ?, TrangThai = ?, DienTich = ? WHERE id = ?',
            [SoPhong, ToaNha_id, TrangThai, DienTich, id]
        );
        return result.affectedRows;
    },

    // Xóa phòng
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM phong WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = PhongModel;
