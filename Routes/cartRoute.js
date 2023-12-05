const express = require('express');
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");

const {
    getCartByUserID,
    addProductToCart,
    updateProductInCart,
} = require('../Controllers/cartController');

router.get('/getCart/:userID', getCartByUserID);
router.post('/addProduct/:cartID', isAuthenticated(['user']), addProductToCart);
router.put('/updateProduct/:cartID', isAuthenticated(['user']), updateProductInCart);

module.exports = router;