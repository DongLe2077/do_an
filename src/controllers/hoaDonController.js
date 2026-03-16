const HoaDonModel = require('../models/hoaDonModel');
const response = require('../utils/responseFormat');

// Generate unique ID for HoaDon
const generateId = () => {
    return 'HD' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
};

const HoaDonController = {
    // Lấy tất cả hóa đơn
    getAll: async (req, res) => {
        try {
            const data = await HoaDonModel.getAll();
            return response.success(res, data, 'Lấy danh sách hóa đơn thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy hóa đơn theo ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await HoaDonModel.getById(id);
            
            if (!data) {
                return response.error(res, 'Không tìm thấy hóa đơn', 404);
            }
            
            return response.success(res, data, 'Lấy thông tin hóa đơn thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy hóa đơn theo phòng
    getByPhong: async (req, res) => {
        try {
            const { Phong_id } = req.params;
            const data = await HoaDonModel.getByPhong(Phong_id);
            return response.success(res, data, 'Lấy danh sách hóa đơn theo phòng thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy hóa đơn theo trạng thái
    getByTrangThai: async (req, res) => {
        try {
            const { TrangThai } = req.params;
            const data = await HoaDonModel.getByTrangThai(TrangThai);
            return response.success(res, data, 'Lấy danh sách hóa đơn theo trạng thái thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Tạo hóa đơn mới
    create: async (req, res) => {
        try {
            const { MaHoaDon, ThangThu, Phong_id, TongTien, TrangThai, HanDongTien } = req.body;
            
            if (!Phong_id || !ThangThu) {
                return response.error(res, 'Phòng và tháng thu là bắt buộc', 400);
            }
            
            const maHoaDon = MaHoaDon || generateId();
            const insertId = await HoaDonModel.create({ 
                MaHoaDon: maHoaDon, ThangThu, Phong_id, TongTien, 
                TrangThai: TrangThai || 'chuathanhtoan', HanDongTien 
            });
            return response.success(res, { id: insertId, MaHoaDon: maHoaDon }, 'Tạo hóa đơn thành công', 201);
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Cập nhật hóa đơn
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { TongTien, TrangThai, HanDongTien } = req.body;
            
            const existing = await HoaDonModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy hóa đơn', 404);
            }
            
            await HoaDonModel.update(id, { TongTien, TrangThai, HanDongTien });
            return response.success(res, null, 'Cập nhật hóa đơn thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Thanh toán hóa đơn
    thanhToan: async (req, res) => {
        try {
            const { id } = req.params;
            
            const existing = await HoaDonModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy hóa đơn', 404);
            }
            
            await HoaDonModel.updateTrangThai(id, 'dathanhtoan');
            return response.success(res, null, 'Thanh toán hóa đơn thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Xóa hóa đơn
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            
            const existing = await HoaDonModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy hóa đơn', 404);
            }
            
            await HoaDonModel.delete(id);
            return response.success(res, null, 'Xóa hóa đơn thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    }
};

module.exports = HoaDonController;
