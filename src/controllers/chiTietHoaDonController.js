const ChiTietHoaDonModel = require('../models/chiTietHoaDonModel');
const HoaDonModel = require('../models/hoaDonModel');
const response = require('../utils/responseFormat');

const ChiTietHoaDonController = {
    // Lấy chi tiết theo hóa đơn
    getByHoaDon: async (req, res) => {
        try {
            const { HoaDon_id } = req.params;
            const chiTiet = await ChiTietHoaDonModel.getByHoaDon(HoaDon_id);
            const tongTien = await ChiTietHoaDonModel.getTongTien(HoaDon_id);

            return response.success(res, { chiTiet, tongTien }, 'Lấy chi tiết hóa đơn thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Thêm 1 khoản tiền vào hóa đơn
    create: async (req, res) => {
        try {
            const { HoaDon_id, TenDichVu, SoLuong, DonGia, GhiChu } = req.body;

            if (!HoaDon_id || !TenDichVu) {
                return response.error(res, 'HoaDon_id và TenDichVu là bắt buộc', 400);
            }

            // Kiểm tra hóa đơn tồn tại
            const hoaDon = await HoaDonModel.getById(HoaDon_id);
            if (!hoaDon) {
                return response.error(res, 'Không tìm thấy hóa đơn', 404);
            }

            const thanhTien = (SoLuong || 1) * (DonGia || 0);
            const insertId = await ChiTietHoaDonModel.create({
                HoaDon_id, TenDichVu, SoLuong, DonGia, ThanhTien: thanhTien, GhiChu
            });

            // Cập nhật lại TongTien của hóa đơn
            const tongTien = await ChiTietHoaDonModel.getTongTien(HoaDon_id);
            await HoaDonModel.update(HoaDon_id, { 
                TongTien: tongTien, 
                TrangThai: hoaDon.TrangThai, 
                HanDongTien: hoaDon.HanDongTien 
            });

            return response.success(res, { id: insertId, ThanhTien: thanhTien, TongTienMoi: tongTien }, 'Thêm chi tiết hóa đơn thành công', 201);
        } catch (error) {
            return response.error(res, error.message);
        }
    },

    // Xóa 1 khoản tiền khỏi hóa đơn
    delete: async (req, res) => {
        try {
            const { id } = req.params;

            const existing = await ChiTietHoaDonModel.getById(id);
            if (!existing) {
                return response.error(res, 'Không tìm thấy chi tiết hóa đơn', 404);
            }

            const HoaDon_id = existing.HoaDon_id;
            await ChiTietHoaDonModel.delete(id);

            // Cập nhật lại TongTien của hóa đơn
            const hoaDon = await HoaDonModel.getById(HoaDon_id);
            const tongTien = await ChiTietHoaDonModel.getTongTien(HoaDon_id);
            await HoaDonModel.update(HoaDon_id, { 
                TongTien: tongTien, 
                TrangThai: hoaDon.TrangThai, 
                HanDongTien: hoaDon.HanDongTien 
            });

            return response.success(res, { TongTienMoi: tongTien }, 'Xóa chi tiết hóa đơn thành công');
        } catch (error) {
            return response.error(res, error.message);
        }
    }
};

module.exports = ChiTietHoaDonController;
