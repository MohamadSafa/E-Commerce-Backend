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
router.put("/update/:ID", upload.single("productImage"), updateProductByID);
router.delete("/delete/:ID", deleteProductByID);

router.get("/getBrand/:brand", getProductsByBrand);
router.get("/getName/:name", getProductsByName);
router.get("/getCategory/:category", getProductsByCategory);
router.get("/getPrice/:minPrice/:maxPrice", getProductsByPriceRange);
router.get("/getStock/:stockStatus", getProductsByStockStatus);
router.get(
  "/getDiscount/:minDiscount/:maxDiscount",
  getProductsByDiscountPercentage
);

module.exports = router;