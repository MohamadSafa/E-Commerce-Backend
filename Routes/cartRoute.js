const express = require('express');
const router = express.Router();
const isAuthenticated = require("../middlewares/Auth");

const {
    getCartByUserID,
    addProductToCart,
    removeProductFromCart,
} = require('../Controllers/cartController');

router.get('/getCart/:userID', getCartByUserID);
router.post('/addProduct/:cartID', isAuthenticated(['customer']), addProductToCart);
router.post('/removeProduct/:cartID', isAuthenticated(['customer']), removeProductFromCart);

module.exports = router;