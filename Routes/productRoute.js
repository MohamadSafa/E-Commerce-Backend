const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  addProduct,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
  getProductsByBrand,
  getProductsByName,
  getProductsByCategory,
  getProductsByPriceRange,
  getProductsByStockStatus,
  getProductsByDiscountPercentage,
} = require("../Controllers/productController");

router.post("/add", upload.single("productImage"), addProduct);
router.get("/getAll", getAllProducts);
router.get("/getByID/:ID", getProductByID);
router.put("/update/:ID", updateProductByID);
router.delete("/delete/:ID", deleteProductByID);

router.get("/get/:brand", getProductsByBrand);
router.get("/get/:name", getProductsByName);
router.get("/get/:category", getProductsByCategory);
router.get("/get/:minPrice/:maxPrice", getProductsByPriceRange);
router.get("/get/:stockStatus", getProductsByStockStatus);
router.get("/get/:minDiscount/:maxDiscount", getProductsByDiscountPercentage);

module.exports = router;
