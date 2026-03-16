const db = require('../config/db.config');

const DanhSachDichVuModel = {
    // Lấy tất cả dịch vụ
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT dv.*, p.SoPhong 
            FROM danhsachdichvu dv 
            LEFT JOIN phong p ON dv.Phong_id = p.id
        `);
        return rows;
    },

    // Lấy dịch vụ theo ID
    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT dv.*, p.SoPhong 
            FROM danhsachdichvu dv 
            LEFT JOIN phong p ON dv.Phong_id = p.id
            WHERE dv.id = ?
        `, [id]);
        return rows[0];
    },

    // Lấy dịch vụ theo phòng
    getByPhong: async (Phong_id) => {
        const [rows] = await db.query('SELECT * FROM danhsachdichvu WHERE Phong_id = ?', [Phong_id]);
        return rows;
    },

    // Lấy dịch vụ theo mã
    getByMa: async (MaDichVu) => {
        const [rows] = await db.query('SELECT * FROM danhsachdichvu WHERE MaDichVu = ?', [MaDichVu]);
        return rows[0];
    },

    // Tạo dịch vụ mới
    create: async (data) => {
        const { MaDichVu, TenDichVu, Phong_id, DonGia } = data;
        const [result] = await db.query(
            'INSERT INTO danhsachdichvu (MaDichVu, TenDichVu, Phong_id, DonGia) VALUES (?, ?, ?, ?)',
            [MaDichVu, TenDichVu, Phong_id, DonGia]
        );
        return result.insertId;
    },

    // Cập nhật dịch vụ
    update: async (id, data) => {
        const { TenDichVu, Phong_id, DonGia } = data;
        const [result] = await db.query(
            'UPDATE danhsachdichvu SET TenDichVu = ?, Phong_id = ?, DonGia = ? WHERE id = ?',
            [TenDichVu, Phong_id, DonGia, id]
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
