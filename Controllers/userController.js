const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email, password }); // User.find({}) == select * from user
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to get data",
      error: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}); // User.find({}) == select * from user
    res.status(200).json({
      success: true,
      message: "Data retrieved successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to get data",
      error: error,
    });
  }
};

const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.ID); // .ID should be the same in the route
    res.status(200).json({
      success: true,
      message: "data retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to get data by ID",
      error: error,
    });
  }
};

const addUser = async (req, res) => {
  const { fullName, email, password, role, phoneNumber, address } = req.body;

  try {
    if (!fullName || !email || !password || !role || !phoneNumber || !address) {
      throw error("All field must be filled");
    }
    const user = await User.create({
      fullName,
      email,
      password,
      role,
      phoneNumber,
      address,
    });
    res.status(200).json({
      success: true,
      message: "Data added successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to add data",
      error: error,
    });
  }
};

const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.deleteOne({ _id: id }); // _id is auto-generated in mongoose
    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unable to delete data",
      error: error,
    });
  }
};

const updateUserByID = async (req, res) => {
  const { fullName, email, password, role, phoneNumber, address } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.ID },
      { fullName, email, password, role, phoneNumber, address }
    );
    res.status(200).json({
      success: true,
      message: "data updated successfully.",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update data",
      error: error,
    });
  }
};

module.exports = {
  login,
  getAllUsers,
  getUserByID,
  addUser,
  updateUserByID,
  deleteUserByID,
};
