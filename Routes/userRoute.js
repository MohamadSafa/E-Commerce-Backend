const express = require("express");
const router = express.Router();
const controllers = require("../Controllers/userController");
const isAuthenticated = require("../middlewares/auth");

router.post("/login", controllers.login); // we put 'post' not 'get' because we are passing the email and password by req.body
router.post("/register", controllers.addUser);
router.get("/getAll", controllers.getAllUsers);
router.get("/getUserId/:ID", controllers.getUserByID);
router.delete(
  "/delete/:id",
  isAuthenticated(["admin"]),
  controllers.deleteUserByID
);
router.put("/update/:ID", isAuthenticated(["admin"]), controllers.updateByID);
router.put(
  "/switchToAdmin/:ID",
  isAuthenticated(["admin"]),
  controllers.switchToAdmin
);
router.put(
  "/switchToSeller/:ID",
  isAuthenticated(["admin"]),
  controllers.switchToSeller
);

module.exports = router;
