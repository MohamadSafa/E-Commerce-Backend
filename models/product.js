const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productBrand: { type: String, required: true },
    productImage: { type: String, required: true },
    productDescription: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    discountPercentage: { type: Number }
},
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;