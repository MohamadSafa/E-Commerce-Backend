const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require("../models/user");

const getCartByUserID = async (req, res) => {
    try {
        const userExists = await User.findById(req.params.userID);

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: `No cart for the user with id ${req.params.userID}`,
            });
        }

        const cart = await Cart.findOne({ userId: req.params.userID })
        console.log(cart.products[0].productId.toString());
        //.populate('products.productId', 'products.quantity');
        const product = await Product.findOne({_id:cart.products[0].productId.toString()})
        res.status(200).json({
            success: true,
            message: 'Data retrieved successfully',
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Unable to get cart by user id',
            error: error.message,
        });
    }
};

const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find({});
        res.status(200).json({
            success: true,
            message: "All Carts retrieved successfully",
            data: carts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to retrieve carts",
            error: error.message,
        });
    }
};

const getCartByID = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.ID);
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to get cart by ID",
            error: error.message,
        });
    }
};

const addProduct = async (req, res) => {
    const { userId, products } = req.body;
    try {
        let cart = await Cart.findOne({ userId: userId });
        console.log(cart)
        if (!cart) {
            const cartArray = new Cart({ userId: userId, products: products });
            const addedCart = await cartArray.save();
            return res.status(200).json({
                success: true,
                message: 'Product added to cart successfully',
                data: addedCart,
            });
        }

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
};

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

const deleteCartByID = async (req, res) => {
    const { ID } = req.params;
    try {
        const cart = await Cart.deleteOne({ userId: ID });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Cart deleted successfully",
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "unable to delete cart",
            error: error.message,
        });
    }
};

module.exports = {
    getCartByUserID,
    getAllCarts,
    getCartByID,
    addProduct,
    updateProductInCart,
    deleteCartByID,
};