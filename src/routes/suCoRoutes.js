const express = require('express');
const router = express.Router();
const SuCoController = require('../controllers/suCoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// GET /api/suco - Lấy tất cả sự cố
router.get('/', authMiddleware, SuCoController.getAll);

// GET /api/suco/trangthai/:TrangThai - Lấy sự cố theo trạng thái (đặt trước /:id)
router.get('/trangthai/:TrangThai', authMiddleware, SuCoController.getByTrangThai);

// GET /api/suco/nguoibao/:NguoiBao_id - Lấy sự cố theo người báo
router.get('/nguoibao/:NguoiBao_id', authMiddleware, SuCoController.getByNguoiBao);

// GET /api/suco/phong/:Phong_id - Lấy sự cố theo phòng
router.get('/phong/:Phong_id', authMiddleware, SuCoController.getByPhong);

// GET /api/suco/:id - Lấy sự cố theo ID
router.get('/:id', authMiddleware, SuCoController.getById);

// POST /api/suco - Báo cáo sự cố mới (cư dân có thể báo cáo)
router.post('/', authMiddleware, SuCoController.create);

// PUT /api/suco/:id - Cập nhật sự cố (chỉ Ban quản lý)
router.put('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), SuCoController.update);

// PATCH /api/suco/:id/xuly - Xử lý sự cố (chỉ Ban quản lý)
router.patch('/:id/xuly', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), SuCoController.xuLy);

// DELETE /api/suco/:id - Xóa sự cố (chỉ Ban quản lý)
router.delete('/:id', authMiddleware, roleMiddleware(roleMiddleware.ROLES.BAN_QUAN_LY), SuCoController.delete);

module.exports = router;

module.exports = router;
