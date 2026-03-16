const express = require('express');
const router = express.Router();
const PhongController = require('../controllers/phongController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/phong - Lấy tất cả phòng
router.get('/', PhongController.getAll);

// GET /api/phong/toanha/:ToaNha_id - Lấy phòng theo tòa nhà (đặt trước /:id)
router.get('/toanha/:ToaNha_id', PhongController.getByToaNha);

// GET /api/phong/:id - Lấy phòng theo ID
router.get('/:id', PhongController.getById);

// POST /api/phong - Tạo phòng mới (chỉ Ban quản lý)
router.post('/', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), PhongController.create);

// PUT /api/phong/:id - Cập nhật phòng (chỉ Ban quản lý)
router.put('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), PhongController.update);

// DELETE /api/phong/:id - Xóa phòng (chỉ Ban quản lý)
router.delete('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), PhongController.delete);

module.exports = router;
