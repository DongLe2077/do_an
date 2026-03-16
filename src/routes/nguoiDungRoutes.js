const express = require('express');
const router = express.Router();
const NguoiDungController = require('../controllers/nguoiDungController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// POST /api/nguoidung/login - Đăng nhập
router.post('/login', NguoiDungController.login);

// POST /api/nguoidung/register - Đăng ký
router.post('/register', NguoiDungController.register);

// GET /api/nguoidung - Lấy tất cả người dùng (chỉ Ban quản lý)
router.get('/', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), NguoiDungController.getAll);

// GET /api/nguoidung/me/profile - Lấy thông tin profile user đang đăng nhập (phải đặt TRƯỚC /:id)
router.get('/me/profile', authMiddleware, NguoiDungController.getProfile);

// GET /api/nguoidung/:id - Lấy người dùng theo ID
router.get('/:id', authMiddleware, NguoiDungController.getById);

// PUT /api/nguoidung/:id - Cập nhật người dùng
router.put('/:id', authMiddleware, NguoiDungController.update);

// DELETE /api/nguoidung/:id - Xóa người dùng (chỉ Ban quản lý)
router.delete('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), NguoiDungController.delete);

// PUT /api/nguoidung/:id/password - Đổi mật khẩu
router.put('/:id/password', authMiddleware, NguoiDungController.changePassword);

// PATCH /api/nguoidung/:id/role - Set role (chỉ Ban quản lý)
router.patch('/:id/role', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), NguoiDungController.setRole);

module.exports = router;
