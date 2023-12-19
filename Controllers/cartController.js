const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');

const getCartByUserID = async (req, res) => {
    try {
        const userExists = await User.findById(req.params.userID);

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: `No cart for the user with id ${req.params.userID}`,
            });
        }

        const cart = await Cart.findOne({ userId: req.params.userID }).populate('products.productId', 'products.quantity');

        res.status(200).json({
            success: true,
            message: 'Data retrieved successfully',
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to get cart by user id',
            error: error.message,
        });
    }
};

const addProductToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const productExists = await Product.findById(productId);

        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: `No product with id ${productId} available`,
            });
        }

        const cart = await Cart.findOne({ userId: req.params.userID });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: `No cart for the user with id ${req.params.userID} available`,
            });
        }

        const existingProduct = cart.products.find(product => product.productId.toString() === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity || 1;
        } else {
            cart.products.push({ productId, quantity: quantity || 1 });
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Product added to cart successfully',
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to add product to cart',
            error: error.message,
        });
    }
};z

const updateProductInCart = async (req, res) => {
    try {
        const { productID, quantity } = req.body;

        const cart = await Cart.findOne({ _id: req.params.cartID });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: `No cart with id ${req.params.cartID} available`,
            });
        }

        const productExists = await Product.findById(productID);

        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: `No product with id ${productID} available`,
            });
        }

        if (!cart.products.some(product => product.productId.toString() === productID)) {
            // Product not found in the cart
            return res.status(401).json({
                success: false,
                message: `Product with id ${productID} not found in your cart`,
            });
        }

        const index = cart.products.indexOf(productID);
        if (index !== -1) {
            if (quantity > 0) {
                // Update quantity
                cart.products[index].quantity = quantity;
            } else {
                // Remove product if quantity is zero
                cart.products.splice(index, 1);
            }

            await cart.save();
        }

        res.status(200).json({
            success: true,
            message: 'Cart updated successfully',
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to update cart',
            error: error.message,
        });
    }
};

module.exports = {
    getCartByUserID,
    addProductToCart,
    updateProductInCart,
};