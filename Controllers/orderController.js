const Order = require('../models/order');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}); // User.find({}) == select * from user
    res.status(200).json({
      success: true,
      message: "order retrieved successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to get order",
      error: error,
    });
  }
};

const getOrderByID = async (req, res) => {
  try {
    const order = await Order.findById(req.params.ID); // .ID should be the same in the route
    res.status(200).json({
      success: true,
      message: "order retrieved successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to get order by ID",
      error: error,
    });
  }
};

const addOrder = async (req, res) => {
  const { userId, productId , quantity, totalQuantity, totalPrice, payment, orderStatus } = req.body;

  try {
    if ( !userId || !productId || !quantity || !totalQuantity || !totalPrice || !payment || !orderStatus) {
      throw error("All field must be filled");
    }
    const order = await Order.create({
      userId,
      products: [
        {
            productId,
            quantity 
        }
    ],
      totalQuantity,
      totalPrice,
      payment,
      orderStatus,
    });
    res.status(200).json({
      success: true,
      message: "order added successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to add order",
      error: error,
    });
  }
};

const deleteOrderByID = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.deleteOne({ _id: id }); // _id is auto-generated in mongoose
    res.status(200).json({
      success: true,
      message: "order deleted successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to delete order",
      error: error,
    });
  }
};

const updateOrderByID = async (req, res) => {
  const { totalQuantity, totalPrice, payment, orderStatus } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(
      { _id: req.params.ID },
      { totalQuantity, totalPrice, payment, orderStatus }
    );
    res.status(200).json({
      success: true,
      message: "order updated successfully.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update order",
      error: error,
    });
  }
};

module.exports = {
  getAllOrders,
  getOrderByID,
  addOrder,
  deleteOrderByID,
  updateOrderByID,
};
