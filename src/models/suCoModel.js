const db = require('../config/db.config');

const SuCoModel = {
    // Lấy tất cả sự cố
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT sc.*, nb.HoTen as TenNguoiBao, ns.HoTen as TenNguoiSua, p.SoPhong
            FROM suco sc 
            LEFT JOIN nguoidung nb ON sc.NguoiBao_id = nb.id
            LEFT JOIN nguoidung ns ON sc.NguoiSua_id = ns.id
            LEFT JOIN phong p ON sc.Phong_id = p.id
        `);
        return rows;
    },

    // Lấy sự cố theo ID
    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT sc.*, nb.HoTen as TenNguoiBao, ns.HoTen as TenNguoiSua, p.SoPhong
            FROM suco sc 
            LEFT JOIN nguoidung nb ON sc.NguoiBao_id = nb.id
            LEFT JOIN nguoidung ns ON sc.NguoiSua_id = ns.id
            LEFT JOIN phong p ON sc.Phong_id = p.id
            WHERE sc.id = ?
        `, [id]);
        return rows[0];
    },

    // Lấy sự cố theo trạng thái
    getByTrangThai: async (TrangThai) => {
        const [rows] = await db.query('SELECT * FROM suco WHERE TrangThai = ?', [TrangThai]);
        return rows;
    },

    // Lấy sự cố theo người báo
    getByNguoiBao: async (NguoiBao_id) => {
        const [rows] = await db.query('SELECT * FROM suco WHERE NguoiBao_id = ?', [NguoiBao_id]);
        return rows;
    },

    // Lấy sự cố theo phòng
    getByPhong: async (Phong_id) => {
        const [rows] = await db.query('SELECT * FROM suco WHERE Phong_id = ?', [Phong_id]);
        return rows;
    },

    // Tạo sự cố mới
    create: async (data) => {
        const { MaSuCo, NguoiBao_id, Phong_id, TenSuCo, MoTa, AnhSuCo, NgayBaoCao, TrangThai } = data;
        const [result] = await db.query(
            'INSERT INTO suco (MaSuCo, NguoiBao_id, Phong_id, TenSuCo, MoTa, AnhSuCo, NgayBaoCao, TrangThai) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [MaSuCo, NguoiBao_id, Phong_id, TenSuCo, MoTa, AnhSuCo, NgayBaoCao || new Date().toISOString().split('T')[0], TrangThai || 'choxuly']
        );
        return result.insertId;
    },

    // Cập nhật sự cố
    update: async (id, data) => {
        const { TenSuCo, MoTa, AnhSuCo, TrangThai, NguoiSua_id } = data;
        const [result] = await db.query(
            'UPDATE suco SET TenSuCo = ?, MoTa = ?, AnhSuCo = ?, TrangThai = ?, NguoiSua_id = ? WHERE id = ?',
            [TenSuCo, MoTa, AnhSuCo, TrangThai, NguoiSua_id, id]
        );
        return result.affectedRows;
    },

    // Cập nhật trạng thái sự cố
    updateTrangThai: async (id, TrangThai, NguoiSua_id) => {
        const [result] = await db.query(
            'UPDATE suco SET TrangThai = ?, NguoiSua_id = ? WHERE id = ?',
            [TrangThai, NguoiSua_id, id]
        );
        return result.affectedRows;
    },

    // Xóa sự cố
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM suco WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = SuCoModel;
