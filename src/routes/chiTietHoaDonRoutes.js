const express = require('express');
const router = express.Router();
const ChiTietHoaDonController = require('../controllers/chiTietHoaDonController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/chitiethoadon/hoadon/:HoaDon_id - Lấy chi tiết theo hóa đơn
router.get('/hoadon/:HoaDon_id', authMiddleware, ChiTietHoaDonController.getByHoaDon);

// POST /api/chitiethoadon - Thêm khoản tiền vào hóa đơn (chỉ Ban quản lý)
router.post('/', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), ChiTietHoaDonController.create);

// DELETE /api/chitiethoadon/:id - Xóa khoản tiền (chỉ Ban quản lý)
router.delete('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), ChiTietHoaDonController.delete);

module.exports = router;
