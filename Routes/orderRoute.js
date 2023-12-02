const express = require("express");
const router = express.Router();
const controllers = require("../Controllers/orderController");

router.post("/add", controllers.addOrder);
router.get("/getAll", controllers.getAllOrders);
router.get("/getOrderId/:ID", controllers.getOrderByID);
router.put("/update/:ID", controllers.updateOrderByID);
router.delete("/delete/:id", controllers.deleteOrderByID);

module.exports = router;
