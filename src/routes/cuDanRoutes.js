const express = require('express');
const router = express.Router();
const ThongTinCuDanController = require('../controllers/cuDanController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/cudan - Lấy tất cả thông tin cư dân
router.get('/', authMiddleware, ThongTinCuDanController.getAll);

// GET /api/cudan/phong/:Phong_id - Lấy cư dân theo phòng (đặt trước /:id)
router.get('/phong/:Phong_id', authMiddleware, ThongTinCuDanController.getByPhong);

// GET /api/cudan/nguoidung/:NguoiDung_id - Lấy cư dân theo người dùng
router.get('/nguoidung/:NguoiDung_id', authMiddleware, ThongTinCuDanController.getByNguoiDung);

// GET /api/cudan/:id - Lấy cư dân theo ID
router.get('/:id', authMiddleware, ThongTinCuDanController.getById);

// POST /api/cudan - Tạo thông tin cư dân mới (chỉ Ban quản lý)
router.post('/', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), ThongTinCuDanController.create);

// PUT /api/cudan/:id - Cập nhật thông tin cư dân (chỉ Ban quản lý)
router.put('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), ThongTinCuDanController.update);

// DELETE /api/cudan/:id - Xóa thông tin cư dân (chỉ Ban quản lý)
router.delete('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), ThongTinCuDanController.delete);

module.exports = router;
