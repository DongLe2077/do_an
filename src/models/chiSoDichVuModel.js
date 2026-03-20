const db = require('../config/db.config');

const ChiSoDichVuModel = {
    // Lấy tất cả chỉ số dịch vụ
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT csdv.*, p.SoPhong, dv.TenDichVu, dv.DonGia
            FROM chisodichvu csdv 
            LEFT JOIN phong p ON csdv.Phong_id = p.id
            LEFT JOIN danhsachdichvu dv ON csdv.DichVu_id = dv.id
        `);
        return rows;
    },

    // Lấy chỉ số dịch vụ theo ID
    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT csdv.*, p.SoPhong, dv.TenDichVu, dv.DonGia
            FROM chisodichvu csdv 
            LEFT JOIN phong p ON csdv.Phong_id = p.id
            LEFT JOIN danhsachdichvu dv ON csdv.DichVu_id = dv.id
            WHERE csdv.id = ?
        `, [id]);
        return rows[0];
    },

    // Lấy chỉ số theo phòng
    getByPhong: async (Phong_id) => {
        const [rows] = await db.query(`
            SELECT csdv.*, dv.TenDichVu, dv.DonGia
            FROM chisodichvu csdv
            LEFT JOIN danhsachdichvu dv ON csdv.DichVu_id = dv.id
            WHERE csdv.Phong_id = ? 
            ORDER BY csdv.ThangGhi DESC
        `, [Phong_id]);
        return rows;
    },

    // Lấy chỉ số theo tháng
    getByThangGhi: async (ThangGhi) => {
        const [rows] = await db.query(`
            SELECT csdv.*, p.SoPhong, dv.TenDichVu, dv.DonGia
            FROM chisodichvu csdv
            LEFT JOIN phong p ON csdv.Phong_id = p.id
            LEFT JOIN danhsachdichvu dv ON csdv.DichVu_id = dv.id
            WHERE csdv.ThangGhi = ?
        `, [ThangGhi]);
        return rows;
    },

    // Tạo chỉ số mới
    create: async (data) => {
        const { MaGhi, Phong_id, DichVu_id, ChiSoLanGhiTruoc, ChiSoHienTai, ThangGhi } = data;
        const [result] = await db.query(
            'INSERT INTO chisodichvu (MaGhi, Phong_id, DichVu_id, ChiSoLanGhiTruoc, ChiSoHienTai, ThangGhi) VALUES (?, ?, ?, ?, ?, ?)',
            [MaGhi, Phong_id, DichVu_id || null, ChiSoLanGhiTruoc || 0, ChiSoHienTai || 0, ThangGhi]
        );
        return result.insertId;
    },

    // Cập nhật chỉ số
    update: async (id, data) => {
        const { DichVu_id, ChiSoLanGhiTruoc, ChiSoHienTai, ThangGhi } = data;
        const [result] = await db.query(
            'UPDATE chisodichvu SET DichVu_id = ?, ChiSoLanGhiTruoc = ?, ChiSoHienTai = ?, ThangGhi = ? WHERE id = ?',
            [DichVu_id, ChiSoLanGhiTruoc, ChiSoHienTai, ThangGhi, id]
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
