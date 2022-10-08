// In src/v1/routes/userRoutes.js
const express = require("express");
const userController = require("../../controllers/userControllers");
const itemsController = require("../../controllers/itemControllers");
const auth = require("../../controllers/auth");
const router = express.Router();


router.use("/admin", auth.protectAdmin);
router.get("/admin/users", userController.getAllUsers);
router.patch("/admin/users/:userid", userController.updateOneUser);
router.get("/admin/categories", itemsController.getAllCategories);
router.post("/admin/categories/new", itemsController.createCategory);



module.exports = router;
