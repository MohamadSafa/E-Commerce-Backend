const Cart = require('../models/cart');
const User = require('../models/user');
const Product = require('../models/product');

const getCartByUserID = async (req, res) => {
    try {
        const userExists = await User.findById(req.params.userId);

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: `No cart for the user with id ${req.params.userId}`,
            });
        }

        const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId', 'quantity');

        res.status(200).json({
            success: true,
            message: 'Data retrieved successfully',
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to get cart by user id',
            error: error,
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

        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: `No cart for the user with id ${req.params.userId} available`,
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
            error: error,
        });
    }
};

const removeProductFromCart = async (req, res) => {
    try {
        const { productId, quantityToRemove } = req.body;

        const cart = await Cart.findOne({ userId: req.params.userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: `No cart for the user with id ${req.params.userId} available`,
            });
        }

        const existingProduct = cart.products.find(product => product.productId.toString() === productId);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: `Product with id ${productId} not found in the cart`,
            });
        }

        // existingProduct.quantity -= quantityToRemove;

        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Product removed from cart successfully',
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to remove product from cart',
            error: error,
        });
    }
};

module.exports = {
    getCartByUserID,
    addProductToCart,
    removeProductFromCart,
};