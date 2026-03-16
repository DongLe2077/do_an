const db = require('../config/db.config');

const NguoiDungModel = {
    // Lấy tất cả người dùng
    getAll: async () => {
        const [rows] = await db.query('SELECT id, MaNguoiDung, TenDangNhap, HoTen, SoDienThoai, VaiTro, TrangThai FROM nguoidung');
        return rows;
    },

    // Lấy người dùng theo ID
    getById: async (id) => {
        const [rows] = await db.query(
            'SELECT id, MaNguoiDung, TenDangNhap, HoTen, SoDienThoai, VaiTro, TrangThai FROM nguoidung WHERE id = ?',
            [id]
        );
        return rows[0];
    },

    // Lấy người dùng theo mã
    getByMa: async (MaNguoiDung) => {
        const [rows] = await db.query(
            'SELECT id, MaNguoiDung, TenDangNhap, HoTen, SoDienThoai, VaiTro, TrangThai FROM nguoidung WHERE MaNguoiDung = ?',
            [MaNguoiDung]
        );
        return rows[0];
    },

    // Lấy người dùng theo tên đăng nhập (dùng cho login)
    getByUsername: async (TenDangNhap) => {
        const [rows] = await db.query('SELECT * FROM nguoidung WHERE TenDangNhap = ?', [TenDangNhap]);
        return rows[0];
    },

    // Tạo người dùng mới
    create: async (data) => {
        const { MaNguoiDung, TenDangNhap, MatKhau, HoTen, SoDienThoai, VaiTro, TrangThai } = data;
        const [result] = await db.query(
            'INSERT INTO nguoidung (MaNguoiDung, TenDangNhap, MatKhau, HoTen, SoDienThoai, VaiTro, TrangThai) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [MaNguoiDung, TenDangNhap, MatKhau, HoTen, SoDienThoai, VaiTro || 'cudan', TrangThai || 'hoatdong']
        );
        return result.insertId;
    },

    // Cập nhật người dùng
    update: async (id, data) => {
        const { HoTen, SoDienThoai, VaiTro, TrangThai } = data;
        const [result] = await db.query(
            'UPDATE nguoidung SET HoTen = ?, SoDienThoai = ?, VaiTro = ?, TrangThai = ? WHERE id = ?',
            [HoTen, SoDienThoai, VaiTro, TrangThai, id]
        );
        return result.affectedRows;
    },

    // Cập nhật mật khẩu
    updatePassword: async (id, MatKhau) => {
        const [result] = await db.query('UPDATE nguoidung SET MatKhau = ? WHERE id = ?', [MatKhau, id]);
        return result.affectedRows;
    },

    // Cập nhật role (phân quyền)
    updateRole: async (id, VaiTro) => {
        const [result] = await db.query('UPDATE nguoidung SET VaiTro = ? WHERE id = ?', [VaiTro, id]);
        return result.affectedRows;
    },

    // Lấy user với mật khẩu (dùng cho đổi mật khẩu)
    getByIdWithPassword: async (id) => {
        const [rows] = await db.query('SELECT * FROM nguoidung WHERE id = ?', [id]);
        return rows[0];
    },

    // Xóa người dùng
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM nguoidung WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = NguoiDungModel;
