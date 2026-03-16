const SuCoModel = require('../models/suCoModel');
const response = require('../utils/responseFormat');

// Generate unique ID for SuCo
const generateId = () => {
    return 'SC' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
};

const SuCoController = {
    // Lấy tất cả sự cố
    getAll: async (req, res) => {
        try {
            const data = await SuCoModel.getAll();
            return response.success(res, data, 'Lấy danh sách sự cố thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy sự cố theo ID
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await SuCoModel.getById(id);
            
            if (!data) {
                return response.error(res, 'Không tìm thấy sự cố', 404);
            }
            
            return response.success(res, data, 'Lấy thông tin sự cố thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy sự cố theo trạng thái
    getByTrangThai: async (req, res) => {
        try {
            const { TrangThai } = req.params;
            const data = await SuCoModel.getByTrangThai(TrangThai);
            return response.success(res, data, 'Lấy danh sách sự cố theo trạng thái thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy sự cố theo người báo
    getByNguoiBao: async (req, res) => {
        try {
            const { NguoiBao_id } = req.params;
            const data = await SuCoModel.getByNguoiBao(NguoiBao_id);
            return response.success(res, data, 'Lấy danh sách sự cố theo người báo thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Lấy sự cố theo phòng
    getByPhong: async (req, res) => {
        try {
            const { Phong_id } = req.params;
            const data = await SuCoModel.getByPhong(Phong_id);
            return response.success(res, data, 'Lấy danh sách sự cố theo phòng thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Tạo sự cố mới (báo cáo sự cố)
    create: async (req, res) => {
        try {
            const { MaSuCo, NguoiBao_id, Phong_id, TenSuCo, MoTa, AnhSuCo, NgayBaoCao, TrangThai } = req.body;
            
            if (!TenSuCo || !MoTa) {
                return response.error(res, 'Tên sự cố và mô tả là bắt buộc', 400);
            }
            
            const maSuCo = MaSuCo || generateId();
            const insertId = await SuCoModel.create({ 
                MaSuCo: maSuCo, NguoiBao_id, Phong_id, TenSuCo, MoTa, AnhSuCo, NgayBaoCao,
                TrangThai: TrangThai || 'choxuly' 
            });
            return response.success(res, { id: insertId, MaSuCo: maSuCo }, 'Báo cáo sự cố thành công', 201);
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Cập nhật sự cố
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { TenSuCo, MoTa, AnhSuCo, TrangThai, NguoiSua_id } = req.body;
            
            const existing = await SuCoModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy sự cố', 404);
            }
            
            await SuCoModel.update(id, { TenSuCo, MoTa, AnhSuCo, TrangThai, NguoiSua_id });
            return response.success(res, null, 'Cập nhật sự cố thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Xử lý sự cố (gán người sửa và cập nhật trạng thái)
    xuLy: async (req, res) => {
        try {
            const { id } = req.params;
            const { NguoiSua_id, TrangThai } = req.body;
            
            const existing = await SuCoModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy sự cố', 404);
            }
            
            await SuCoModel.updateTrangThai(id, TrangThai, NguoiSua_id);
            return response.success(res, null, 'Cập nhật trạng thái sự cố thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Xóa sự cố
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            
            const existing = await SuCoModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy sự cố', 404);
            }
            
            await SuCoModel.delete(id);
            return response.success(res, null, 'Xóa sự cố thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    }
};

module.exports = SuCoController;
