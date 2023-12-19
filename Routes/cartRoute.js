const express = require('express');
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");

const {
    getCartByUserID,
    getAllCarts,
    getCartByID,
    addProduct,
    updateProductInCart,
    deleteCartByID
} = require('../Controllers/cartController');

router.get('/getCart/:userID', getCartByUserID);
router.post('/addProduct', addProduct);
router.put('/updateProduct/:cartID', updateProductInCart);
router.get("/getAll", getAllCarts);
router.get("/getByID/:ID", getCartByID);
router.delete("/delete/:ID", deleteCartByID);

module.exports = router;