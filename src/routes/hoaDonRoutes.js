const express = require('express');
const router = express.Router();
const HoaDonController = require('../controllers/hoaDonController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/hoadon - Lấy tất cả hóa đơn
router.get('/', authMiddleware, HoaDonController.getAll);

// GET /api/hoadon/phong/:Phong_id - Lấy hóa đơn theo phòng (đặt trước /:id)
router.get('/phong/:Phong_id', authMiddleware, HoaDonController.getByPhong);

// GET /api/hoadon/trangthai/:TrangThai - Lấy hóa đơn theo trạng thái
router.get('/trangthai/:TrangThai', authMiddleware, HoaDonController.getByTrangThai);

// GET /api/hoadon/:id - Lấy hóa đơn theo ID
router.get('/:id', authMiddleware, HoaDonController.getById);

// POST /api/hoadon - Tạo hóa đơn mới (chỉ Ban quản lý)
router.post('/', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), HoaDonController.create);

// PUT /api/hoadon/:id - Cập nhật hóa đơn (chỉ Ban quản lý)
router.put('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), HoaDonController.update);

// PATCH /api/hoadon/:id/thanhtoan - Thanh toán hóa đơn
router.patch('/:id/thanhtoan', authMiddleware, HoaDonController.thanhToan);

// DELETE /api/hoadon/:id - Xóa hóa đơn (chỉ Ban quản lý)
router.delete('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), HoaDonController.delete);

module.exports = router;

module.exports = router;
