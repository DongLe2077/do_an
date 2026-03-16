const ToaNhaModel = require('../models/toaNhaModel');
const response = require('../utils/responseFormat');

// Generate unique ID for ToaNha
const generateId = () => {
    return 'TN' + Date.now().toString().slice(-6) + Math.random().toString(36).slice(-3).toUpperCase();
};

const ToaNhaController = {
    // Lấy tất cả tòa nhà
    getAll: async (req, res) => {
        try {
            const data = await ToaNhaModel.getAll();
            return response.success(res, data, 'Lấy danh sách tòa nhà thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy tòa nhà theo ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await ToaNhaModel.getById(id);
            
            if (!data) {
                return response.error(res, 'Không tìm thấy tòa nhà', 404);
            }
            
            return response.success(res, data, 'Lấy thông tin tòa nhà thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Tạo tòa nhà mới
    create: async (req, res) => {
        try {
            const { TenToaNha, SoLuongPhong } = req.body;
            
            if (!TenToaNha) {
                return response.error(res, 'Tên tòa nhà là bắt buộc', 400);
            }
            
            const MaToaNha = generateId();
            const result = await ToaNhaModel.create({ MaToaNha, TenToaNha, SoLuongPhong: SoLuongPhong || 0 });
            return response.success(res, { id: result.insertId, MaToaNha }, 'Tạo tòa nhà thành công', 201);
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Cập nhật tòa nhà
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { TenToaNha, SoLuongPhong } = req.body;
            
            const existing = await ToaNhaModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy tòa nhà', 404);
            }
            
            await ToaNhaModel.update(id, { TenToaNha, SoLuongPhong });
            return response.success(res, null, 'Cập nhật tòa nhà thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Xóa tòa nhà
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            
            const existing = await ToaNhaModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy tòa nhà', 404);
            }
            
            await ToaNhaModel.delete(id);
            return response.success(res, null, 'Xóa tòa nhà thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    }
};

module.exports = ToaNhaController;
