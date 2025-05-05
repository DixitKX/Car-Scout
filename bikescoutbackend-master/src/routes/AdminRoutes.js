const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

router.get("/users", adminController.getAllUsers);
router.put("/users/block/:id", adminController.toggleBlockUser);
router.delete("/users/:id", adminController.deleteUser);
router.get("/users/:id", adminController.getUserDetails);

module.exports = router;
