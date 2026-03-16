const ChiSoDichVuModel = require('../models/chiSoDichVuModel');
const response = require('../utils/responseFormat');

// Generate unique ID for ChiSoDichVu
const generateId = () => {
    return 'CS' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
};

const ChiSoDichVuController = {
    // Lấy tất cả chỉ số dịch vụ
    getAll: async (req, res) => {
        try {
            const data = await ChiSoDichVuModel.getAll();
            return response.success(res, data, 'Lấy danh sách chỉ số dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy chỉ số theo ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await ChiSoDichVuModel.getById(id);
            
            if (!data) {
                return response.error(res, 'Không tìm thấy chỉ số dịch vụ', 404);
            }
            
            return response.success(res, data, 'Lấy thông tin chỉ số dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy chỉ số theo phòng (Phong_id)
    getByPhong: async (req, res) => {
        try {
            const { Phong_id } = req.params;
            const data = await ChiSoDichVuModel.getByPhong(Phong_id);
            return response.success(res, data, 'Lấy danh sách chỉ số dịch vụ theo phòng thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy chỉ số theo tháng ghi
    getByThangGhi: async (req, res) => {
        try {
            const { ThangGhi } = req.params;
            const data = await ChiSoDichVuModel.getByThangGhi(ThangGhi);
            return response.success(res, data, 'Lấy danh sách chỉ số theo tháng ghi thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Tạo chỉ số dịch vụ mới
    create: async (req, res) => {
        try {
            const { Phong_id, ChiSoLanGhiTruoc, ChiSoHienTai, ThangGhi } = req.body;
            
            if (!Phong_id || !ThangGhi) {
                return response.error(res, 'Phong_id và tháng ghi là bắt buộc', 400);
            }
            
            const MaGhi = generateId();
            const result = await ChiSoDichVuModel.create({ 
                MaGhi, 
                Phong_id, 
                ChiSoLanGhiTruoc: ChiSoLanGhiTruoc || 0, 
                ChiSoHienTai: ChiSoHienTai || 0, 
                ThangGhi 
            });
            return response.success(res, { id: result.insertId, MaGhi }, 'Tạo chỉ số dịch vụ thành công', 201);
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Cập nhật chỉ số dịch vụ
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { ChiSoLanGhiTruoc, ChiSoHienTai } = req.body;
            
            const existing = await ChiSoDichVuModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy chỉ số dịch vụ', 404);
            }
            
            await ChiSoDichVuModel.update(id, { ChiSoLanGhiTruoc, ChiSoHienTai });
            return response.success(res, null, 'Cập nhật chỉ số dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Xóa chỉ số dịch vụ
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            
            const existing = await ChiSoDichVuModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy chỉ số dịch vụ', 404);
            }
            
            await ChiSoDichVuModel.delete(id);
            return response.success(res, null, 'Xóa chỉ số dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    }
};

module.exports = ChiSoDichVuController;
