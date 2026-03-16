const DanhSachDichVuModel = require('../models/danhSachDichVuModel');
const response = require('../utils/responseFormat');

// Generate unique ID for DanhSachDichVu
const generateId = () => {
    return 'DV' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
};

const DanhSachDichVuController = {
    // Lấy tất cả dịch vụ
    getAll: async (req, res) => {
        try {
            const data = await DanhSachDichVuModel.getAll();
            return response.success(res, data, 'Lấy danh sách dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy dịch vụ theo ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await DanhSachDichVuModel.getById(id);
            
            if (!data) {
                return response.error(res, 'Không tìm thấy dịch vụ', 404);
            }
            
            return response.success(res, data, 'Lấy thông tin dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy dịch vụ theo Phong_id
    getByPhong: async (req, res) => {
        try {
            const { Phong_id } = req.params;
            const data = await DanhSachDichVuModel.getByPhong(Phong_id);
            return response.success(res, data, 'Lấy danh sách dịch vụ theo phòng thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Tạo dịch vụ mới
    create: async (req, res) => {
        try {
            const { TenDichVu, Phong_id, DonGia } = req.body;
            
            if (!TenDichVu || !Phong_id) {
                return response.error(res, 'Tên dịch vụ và Phong_id là bắt buộc', 400);
            }
            
            const MaDichVu = generateId();
            const result = await DanhSachDichVuModel.create({ 
                MaDichVu, 
                TenDichVu, 
                Phong_id, 
                DonGia: DonGia || 0 
            });
            return response.success(res, { id: result.insertId, MaDichVu }, 'Tạo dịch vụ thành công', 201);
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Cập nhật dịch vụ
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { TenDichVu, DonGia } = req.body;
            
            const existing = await DanhSachDichVuModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy dịch vụ', 404);
            }
            
            await DanhSachDichVuModel.update(id, { TenDichVu, DonGia });
            return response.success(res, null, 'Cập nhật dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Xóa dịch vụ
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            
            const existing = await DanhSachDichVuModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy dịch vụ', 404);
            }
            
            await DanhSachDichVuModel.delete(id);
            return response.success(res, null, 'Xóa dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    }
};

module.exports = DanhSachDichVuController;
