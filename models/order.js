const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    payment: { type: String, required: true },
    orderStatus: { type: String, required: true },
});

{ timestamps: true }

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;