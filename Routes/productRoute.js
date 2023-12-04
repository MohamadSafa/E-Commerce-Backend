const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getProductsByBrand,
    getProductsByName,
    getProductsByCategory,
    getProductsByPriceRange,
    getProductsByStockStatus,
    getProductsByDiscountPercentage,
} = require('../Controllers/productController');

// Routes for Product CRUD operations
router.post('/add', upload.single('image'), addProduct);
router.get('/getAll', getAllProducts);
router.get('/getByID/:ID', getProductById);
router.put('/update/:ID', updateProductById);
router.delete('/delete/:ID', deleteProductById);

// Additional routes for querying products
router.get('/:brand', getProductsByBrand);
router.get('/:name', getProductsByName);
router.get('/:category', getProductsByCategory);
router.get('/:minPrice/:maxPrice', getProductsByPriceRange);
router.get('/:stockStatus', getProductsByStockStatus);
router.get('/:minDiscount/:maxDiscount', getProductsByDiscountPercentage);

module.exports = router;