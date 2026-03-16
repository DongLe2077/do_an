const express = require('express');
const router = express.Router();
const ChiSoDichVuController = require('../controllers/chiSoDichVuController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Lấy tất cả chỉ số dịch vụ (đăng nhập)
router.get('/', authMiddleware, ChiSoDichVuController.getAll);

// Lấy chỉ số theo phòng (đăng nhập) - đặt trước /:id
router.get('/phong/:Phong_id', authMiddleware, ChiSoDichVuController.getByPhong);

// Lấy chỉ số theo tháng ghi (đăng nhập)
router.get('/thangghi/:ThangGhi', authMiddleware, ChiSoDichVuController.getByThangGhi);

// Lấy chỉ số theo ID (đăng nhập)
router.get('/:id', authMiddleware, ChiSoDichVuController.getById);

// Tạo chỉ số dịch vụ mới (ban quản lý)
router.post('/', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), ChiSoDichVuController.create);

// Cập nhật chỉ số dịch vụ (ban quản lý)
router.put('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), ChiSoDichVuController.update);

// Xóa chỉ số dịch vụ (ban quản lý)
router.delete('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), ChiSoDichVuController.delete);

module.exports = router;

module.exports = router;
