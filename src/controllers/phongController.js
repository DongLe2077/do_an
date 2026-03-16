const PhongModel = require('../models/phongModel');
const response = require('../utils/responseFormat');

// Generate unique ID for Phong
const generateId = () => {
    return 'P' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
};

const PhongController = {
    // Lấy tất cả phòng
    getAll: async (req, res) => {
        try {
            const data = await PhongModel.getAll();
            return response.success(res, data, 'Lấy danh sách phòng thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy phòng theo ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await PhongModel.getById(id);
            
            if (!data) {
                return response.error(res, 'Không tìm thấy phòng', 404);
            }
            
            return response.success(res, data, 'Lấy thông tin phòng thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy phòng theo tòa nhà
    getByToaNha: async (req, res) => {
        try {
            const { ToaNha_id } = req.params;
            const data = await PhongModel.getByToaNha(ToaNha_id);
            return response.success(res, data, 'Lấy danh sách phòng theo tòa nhà thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Tạo phòng mới
    create: async (req, res) => {
        try {
            const { MaPhong, SoPhong, ToaNha_id, TrangThai, DienTich } = req.body;
            
            if (!SoPhong || !ToaNha_id) {
                return response.error(res, 'Số phòng và tòa nhà là bắt buộc', 400);
            }
            
            const maPhong = MaPhong || generateId();
            const insertId = await PhongModel.create({ 
                MaPhong: maPhong, SoPhong, ToaNha_id, TrangThai: TrangThai || 'trong', DienTich 
            });
            return response.success(res, { id: insertId, MaPhong: maPhong }, 'Tạo phòng thành công', 201);
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Cập nhật phòng
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { SoPhong, ToaNha_id, TrangThai, DienTich } = req.body;
            
            const existing = await PhongModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy phòng', 404);
            }
            
            await PhongModel.update(id, { SoPhong, ToaNha_id, TrangThai, DienTich });
            return response.success(res, null, 'Cập nhật phòng thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Xóa phòng
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            
            const existing = await PhongModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy phòng', 404);
            }
            
            await PhongModel.delete(id);
            return response.success(res, null, 'Xóa phòng thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    }
};

module.exports = PhongController;
