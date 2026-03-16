const ThongTinCuDanModel = require('../models/cuDanModel');
const response = require('../utils/responseFormat');

const ThongTinCuDanController = {
    // Lấy tất cả cư dân
    getAll: async (req, res) => {
        try {
            const data = await ThongTinCuDanModel.getAll();
            return response.success(res, data, 'Lấy danh sách cư dân thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy cư dân theo ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await ThongTinCuDanModel.getById(id);
            
            if (!data) {
                return response.error(res, 'Không tìm thấy cư dân', 404);
            }
            
            return response.success(res, data, 'Lấy thông tin cư dân thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy cư dân theo phòng
    getByPhong: async (req, res) => {
        try {
            const { Phong_id } = req.params;
            const data = await ThongTinCuDanModel.getByPhong(Phong_id);
            return response.success(res, data, 'Lấy danh sách cư dân theo phòng thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy cư dân theo người dùng
    getByNguoiDung: async (req, res) => {
        try {
            const { NguoiDung_id } = req.params;
            const data = await ThongTinCuDanModel.getByNguoiDung(NguoiDung_id);
            if (!data) {
                return response.error(res, 'Không tìm thấy thông tin cư dân', 404);
            }
            return response.success(res, data, 'Lấy thông tin cư dân theo người dùng thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Tạo cư dân mới
    create: async (req, res) => {
        try {
            const { SoCCCD, HoTen, SoDienThoai, QueQuan, Phong_id, NguoiDung_id } = req.body;
            
            if (!SoCCCD || !HoTen) {
                return response.error(res, 'Số CCCD và họ tên là bắt buộc', 400);
            }
            
            const insertId = await ThongTinCuDanModel.create({ 
                SoCCCD, HoTen, SoDienThoai, QueQuan, Phong_id, NguoiDung_id 
            });
            return response.success(res, { id: insertId }, 'Tạo cư dân thành công', 201);
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Cập nhật cư dân
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { SoCCCD, HoTen, SoDienThoai, QueQuan, Phong_id, NguoiDung_id } = req.body;
            
            const existing = await ThongTinCuDanModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy cư dân', 404);
            }
            
            await ThongTinCuDanModel.update(id, { SoCCCD, HoTen, SoDienThoai, QueQuan, Phong_id, NguoiDung_id });
            return response.success(res, null, 'Cập nhật cư dân thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Xóa cư dân
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            
            const existing = await ThongTinCuDanModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy cư dân', 404);
            }
            
            await ThongTinCuDanModel.delete(id);
            return response.success(res, null, 'Xóa cư dân thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    }
};

module.exports = ThongTinCuDanController;
