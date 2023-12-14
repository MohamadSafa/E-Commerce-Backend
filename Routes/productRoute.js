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

router.post("/add", upload.single("image"), addProduct);
router.get("/getAll", getAllProducts);
router.get("/getByID/:ID", getProductByID);
router.put("/update/:ID", updateProductByID);
router.delete("/delete/:ID", deleteProductByID);

router.get("/getbrand/:brand", getProductsByBrand);
router.get("/getname/:name", getProductsByName);
router.get("/getcategory/:category", getProductsByCategory);
router.get("/getprice/:minPrice/:maxPrice", getProductsByPriceRange);
router.get("/getstock/:stockStatus", getProductsByStockStatus);
router.get("/getdiscount/:minDiscount/:maxDiscount", getProductsByDiscountPercentage);

module.exports = router;
