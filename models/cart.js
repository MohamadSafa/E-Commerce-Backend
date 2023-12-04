const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
},
    { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;