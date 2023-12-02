const express = require("express");
const router = express.Router();
const controllers = require("../Controllers/userController");

router.post("/login", controllers.login); // we put 'post' not 'get' because we are passing the email and password by req.body
router.post("/register", controllers.addUser);
router.get("/getAll", controllers.getAllUsers);
router.get("/getUserId/:ID", controllers.getUserByID);
router.put("/update/:ID", controllers.updateUserByID);
router.delete("/delete/:id", controllers.deleteUserByID);

module.exports = router;
