const db = require('../config/db.config');

const ChiSoDichVuModel = {
    // Lấy tất cả chỉ số dịch vụ
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT csdv.*, p.SoPhong 
            FROM chisodichvu csdv 
            LEFT JOIN phong p ON csdv.Phong_id = p.id
        `);
        return rows;
    },

    // Lấy chỉ số dịch vụ theo ID
    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT csdv.*, p.SoPhong 
            FROM chisodichvu csdv 
            LEFT JOIN phong p ON csdv.Phong_id = p.id
            WHERE csdv.id = ?
        `, [id]);
        return rows[0];
    },

    // Lấy chỉ số theo phòng
    getByPhong: async (Phong_id) => {
        const [rows] = await db.query('SELECT * FROM chisodichvu WHERE Phong_id = ? ORDER BY ThangGhi DESC', [Phong_id]);
        return rows;
    },

    // Lấy chỉ số theo tháng
    getByThangGhi: async (ThangGhi) => {
        const [rows] = await db.query('SELECT * FROM chisodichvu WHERE ThangGhi = ?', [ThangGhi]);
        return rows;
    },

    // Tạo chỉ số mới
    create: async (data) => {
        const { MaGhi, Phong_id, ChiSoLanGhiTruoc, ChiSoHienTai, ThangGhi } = data;
        const [result] = await db.query(
            'INSERT INTO chisodichvu (MaGhi, Phong_id, ChiSoLanGhiTruoc, ChiSoHienTai, ThangGhi) VALUES (?, ?, ?, ?, ?)',
            [MaGhi, Phong_id, ChiSoLanGhiTruoc || 0, ChiSoHienTai || 0, ThangGhi]
        );
        return result.insertId;
    },

    // Cập nhật chỉ số
    update: async (id, data) => {
        const { ChiSoLanGhiTruoc, ChiSoHienTai, ThangGhi } = data;
        const [result] = await db.query(
            'UPDATE chisodichvu SET ChiSoLanGhiTruoc = ?, ChiSoHienTai = ?, ThangGhi = ? WHERE id = ?',
            [ChiSoLanGhiTruoc, ChiSoHienTai, ThangGhi, id]
        );
        return result.affectedRows;
    },

    // Xóa chỉ số
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM chisodichvu WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = ChiSoDichVuModel;
