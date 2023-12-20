const Product = require("../models/product");
const { imageUploader } = require("../extra/imageUploader");

const addProduct = async (req, res) => {
  try {
    const {
      productName,
      productBrand,
      productDescription,
      price,
      category,
      stock,
      discountPercentage,
    } = req.body;

    if (
      !productName ||
      !productBrand ||
      !productDescription ||
      !price ||
      !category ||
      !stock
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    // Upload image to Cloudinary
    const imageURL = await imageUploader(req);

    const newProduct = new Product({
      productName,
      productBrand,
      productImage: imageURL,
      productDescription,
      price,
      category,
      stock,
      discountPercentage,
    });

    const savedProduct = await newProduct.save();

    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Unable to add product",
      error: error,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get all products",
      error: error,
    });
  }
};

const getProductByID = async (req, res) => {
  try {
    const product = await Product.findById(req.params.ID);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with id ${req.params.ID} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Product data retrieved successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get product data by id",
      error: error,
    });
  }
};

const updateProductByID = async (req, res) => {
  let imageURL = "";
  try {
    if (req.file) {
      // Upload image to Cloudinary
      imageURL = await imageUploader(req);
    } else {
      imageURL = req.body.productImage;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.ID,
      { ...req.body, productImage: imageURL },
      { new: true }
    );
    if (!updatedProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update product",
      error: error,
    });
  }
};

const deleteProductByID = async (req, res) => {
  try {
    const deletedProduct = await Product.deleteOne({ _id: req.params.ID });

    if (deletedProduct.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: `No product found with id ${req.params.ID}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Product with id ${req.params.ID} deleted successfully`,
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete product",
      error: error,
    });
  }
};

const getProductsByBrand = async (req, res) => {
  try {
    const products = await Product.find({ productBrand: req.params.brand });
    res.status(200).json({
      success: true,
      message: "Products retrieved by brand successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get products by brand",
      error: error,
    });
  }
};

const getProductsByName = async (req, res) => {
  try {
    const products = await Product.find({
      productName: { $regex: req.params.name, $options: "i" },
    });
    res.status(200).json({
      success: true,
      message: "Products retrieved by name successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get products by name",
      error: error,
    });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });
    res.status(200).json({
      success: true,
      message: "Products retrieved by category successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get products by category",
      error: error,
    });
  }
};

const getProductsByPriceRange = async (req, res) => {
  try {
    const products = await Product.find({
      price: {
        $gte: Number(req.params.minPrice),
        $lte: Number(req.params.maxPrice),
      },
    });
    res.status(200).json({
      success: true,
      message: "Products retrieved by price range successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get products by price range",
      error: error,
    });
  }
};

const getProductsByStockStatus = async (req, res) => {
  try {

    // get product by id -> find({_id: req,params,productID})
    // check stock of this product -> product object check the stock field
    // if > 0 -> in stock otherwise out of stock + return stock number
    
    let products;

    if (req.params.stockStatus === "in-stock") {
      products = await Product.find({ stock: { $gt: 0 } });
    } else if (req.params.stockStatus === "out-of-stock") {
      products = await Product.find({ stock: 0 });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid stock status parameter",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Products retrieved by stock status successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get products by stock status",
      error: error,
    });
  }
};

const getProductsByDiscountPercentage = async (req, res) => {
  try {
    const products = await Product.find({
      discountPercentage: {
        $gte: Number(req.params.minDiscount),
        $lte: Number(req.params.maxDiscount),
      },
    });
    res.status(200).json({
      success: true,
      message: "Products retrieved by discount percentage successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to get products by discount percentage",
      error: error,
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
  getProductsByBrand,
  getProductsByName,
  getProductsByCategory,
  getProductsByPriceRange,
  getProductsByStockStatus,
  getProductsByDiscountPercentage,
};