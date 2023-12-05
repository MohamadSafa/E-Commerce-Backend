const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    totalQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    payment: { type: String, required: true },
    orderStatus: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;