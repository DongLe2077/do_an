const ChiSoDichVuModel = require('../models/chiSoDichVuModel');
const response = require('../utils/responseFormat');

const generateId = () => 'CS' + Date.now().toString().slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();

const ChiSoDichVuController = {
    getAll: async (req, res) => {
        try {
            const data = await ChiSoDichVuModel.getAll();
            return response.success(res, data, 'Lấy danh sách chỉ số dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const data = await ChiSoDichVuModel.getById(id);
            if (!data) return response.error(res, 'Không tìm thấy chỉ số dịch vụ', 404);
            return response.success(res, data, 'Lấy thông tin chỉ số dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    getByHoaDon: async (req, res) => {
        try {
            const { MaHoaDon } = req.params;
            const data = await ChiSoDichVuModel.getByHoaDon(MaHoaDon);
            return response.success(res, data, 'Lấy danh sách chỉ số theo hóa đơn thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    getByNgayGhi: async (req, res) => {
        try {
            const { NgayGhi } = req.params;
            const data = await ChiSoDichVuModel.getByNgayGhi(NgayGhi);
            return response.success(res, data, 'Lấy danh sách chỉ số theo ngày ghi thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    create: async (req, res) => {
        try {
            const { MaDichVu, MaHoaDon, ChiSoLanGhiTruoc, ChiSoHienTai, SoLuong, NgayGhi } = req.body;
            if (!MaDichVu) return response.error(res, 'Mã dịch vụ là bắt buộc', 400);

            const MaGhi = generateId();
            await ChiSoDichVuModel.create({
                MaGhi, MaDichVu, MaHoaDon,
                ChiSoLanGhiTruoc, ChiSoHienTai, SoLuong, NgayGhi
            });
            return response.success(res, { MaGhi }, 'Tạo chỉ số dịch vụ thành công', 201);
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { MaDichVu, MaHoaDon, ChiSoLanGhiTruoc, ChiSoHienTai, SoLuong, NgayGhi } = req.body;

            const existing = await ChiSoDichVuModel.getById(id);
            if (!existing) return response.error(res, 'Không tìm thấy chỉ số dịch vụ', 404);

            await ChiSoDichVuModel.update(id, {
                MaDichVu: MaDichVu || existing.MaDichVu,
                MaHoaDon: MaHoaDon !== undefined ? MaHoaDon : existing.MaHoaDon,
                ChiSoLanGhiTruoc: ChiSoLanGhiTruoc !== undefined ? ChiSoLanGhiTruoc : existing.ChiSoLanGhiTruoc,
                ChiSoHienTai: ChiSoHienTai !== undefined ? ChiSoHienTai : existing.ChiSoHienTai,
                SoLuong: SoLuong !== undefined ? SoLuong : existing.SoLuong,
                NgayGhi: NgayGhi || existing.NgayGhi
            });
            return response.success(res, null, 'Cập nhật chỉ số dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const existing = await ChiSoDichVuModel.getById(id);
            if (!existing) return response.error(res, 'Không tìm thấy chỉ số dịch vụ', 404);

            await ChiSoDichVuModel.delete(id);
            return response.success(res, null, 'Xóa chỉ số dịch vụ thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    }
};

module.exports = ChiSoDichVuController;
