const express = require('express');
const router = express.Router();
const ToaNhaController = require('../controllers/toaNhaController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/toanha - Lấy tất cả tòa nhà
router.get('/', ToaNhaController.getAll);

// GET /api/toanha/:id - Lấy tòa nhà theo ID
router.get('/:id', ToaNhaController.getById);

// POST /api/toanha - Tạo tòa nhà mới (chỉ Ban quản lý)
router.post('/', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), ToaNhaController.create);

// PUT /api/toanha/:id - Cập nhật tòa nhà (chỉ Ban quản lý)
router.put('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), ToaNhaController.update);

// DELETE /api/toanha/:id - Xóa tòa nhà (chỉ Ban quản lý)
router.delete('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), ToaNhaController.delete);

module.exports = router;
