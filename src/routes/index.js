const express = require('express');
const router = express.Router();

// Import các routes
const nguoiDungRoutes = require('./nguoiDungRoutes');
const phongRoutes = require('./phongRoutes');
const cuDanRoutes = require('./cuDanRoutes');
const hoaDonRoutes = require('./hoaDonRoutes');
const chiSoDichVuRoutes = require('./chiSoDichVuRoutes');
const suCoRoutes = require('./suCoRoutes');
const toaNhaRoutes = require('./toaNhaRoutes');
const danhSachDichVuRoutes = require('./danhSachDichVuRoutes');

// Sử dụng các routes
router.use('/nguoidung', nguoiDungRoutes);
router.use('/phong', phongRoutes);
router.use('/cudan', cuDanRoutes);
router.use('/hoadon', hoaDonRoutes);
router.use('/chisodichvu', chiSoDichVuRoutes);
router.use('/suco', suCoRoutes);
router.use('/toanha', toaNhaRoutes);
router.use('/danhsachdichvu', danhSachDichVuRoutes);

// Route kiểm tra API
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API Quản lý chung cư đang hoạt động!',
        version: '1.0.0',
        endpoints: {
            nguoidung: '/api/nguoidung',
            phong: '/api/phong',
            cudan: '/api/cudan',
            hoadon: '/api/hoadon',
            chisodichvu: '/api/chisodichvu',
            suco: '/api/suco',
            toanha: '/api/toanha',
            danhsachdichvu: '/api/danhsachdichvu'
        }
    });
});

module.exports = router;
