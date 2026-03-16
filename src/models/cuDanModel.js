const db = require('../config/db.config');

// Model cho bảng thongtincudan (đổi tên từ cudan)
const ThongTinCuDanModel = {
    // Lấy tất cả cư dân
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT cd.*, p.SoPhong, nd.TenDangNhap
            FROM thongtincudan cd 
            LEFT JOIN phong p ON cd.Phong_id = p.id
            LEFT JOIN nguoidung nd ON cd.NguoiDung_id = nd.id
        `);
        return rows;
    },

    // Lấy cư dân theo ID
    getById: async (id) => {
        const [rows] = await db.query(`
            SELECT cd.*, p.SoPhong, nd.TenDangNhap
            FROM thongtincudan cd 
            LEFT JOIN phong p ON cd.Phong_id = p.id
            LEFT JOIN nguoidung nd ON cd.NguoiDung_id = nd.id
            WHERE cd.id = ?
        `, [id]);
        return rows[0];
    },

    // Lấy cư dân theo phòng
    getByPhong: async (Phong_id) => {
        const [rows] = await db.query('SELECT * FROM thongtincudan WHERE Phong_id = ?', [Phong_id]);
        return rows;
    },

    // Lấy cư dân theo người dùng
    getByNguoiDung: async (NguoiDung_id) => {
        const [rows] = await db.query('SELECT * FROM thongtincudan WHERE NguoiDung_id = ?', [NguoiDung_id]);
        return rows[0];
    },

    // Tạo cư dân mới
    create: async (data) => {
        const { SoCCCD, HoTen, SoDienThoai, QueQuan, Phong_id, NguoiDung_id } = data;
        const [result] = await db.query(
            'INSERT INTO thongtincudan (SoCCCD, HoTen, SoDienThoai, QueQuan, Phong_id, NguoiDung_id) VALUES (?, ?, ?, ?, ?, ?)',
            [SoCCCD, HoTen, SoDienThoai, QueQuan, Phong_id, NguoiDung_id]
        );
        return result.insertId;
    },

    // Cập nhật cư dân
    update: async (id, data) => {
        const { SoCCCD, HoTen, SoDienThoai, QueQuan, Phong_id, NguoiDung_id } = data;
        const [result] = await db.query(
            'UPDATE thongtincudan SET SoCCCD = ?, HoTen = ?, SoDienThoai = ?, QueQuan = ?, Phong_id = ?, NguoiDung_id = ? WHERE id = ?',
            [SoCCCD, HoTen, SoDienThoai, QueQuan, Phong_id, NguoiDung_id, id]
        );
        return result.affectedRows;
    },

    // Xóa cư dân
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM thongtincudan WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = ThongTinCuDanModel;
