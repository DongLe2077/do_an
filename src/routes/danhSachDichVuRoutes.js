const express = require('express');
const router = express.Router();
const DanhSachDichVuController = require('../controllers/danhSachDichVuController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/danhsachdichvu - Lấy tất cả dịch vụ
router.get('/', authMiddleware, DanhSachDichVuController.getAll);

// GET /api/danhsachdichvu/phong/:Phong_id - Lấy dịch vụ theo phòng (đặt trước /:id)
router.get('/phong/:Phong_id', authMiddleware, DanhSachDichVuController.getByPhong);

// GET /api/danhsachdichvu/:id - Lấy dịch vụ theo ID
router.get('/:id', authMiddleware, DanhSachDichVuController.getById);

// POST /api/danhsachdichvu - Tạo dịch vụ mới (chỉ Ban quản lý)
router.post('/', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), DanhSachDichVuController.create);

// PUT /api/danhsachdichvu/:id - Cập nhật dịch vụ (chỉ Ban quản lý)
router.put('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), DanhSachDichVuController.update);

// DELETE /api/danhsachdichvu/:id - Xóa dịch vụ (chỉ Ban quản lý)
router.delete('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), DanhSachDichVuController.delete);

module.exports = router;
