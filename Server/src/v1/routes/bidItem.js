// In src/v1/routes/userRoutes.js
const express = require("express");
const userController = require("../../controllers/userControllers");
const itemsController = require("../../controllers/itemControllers");
const auth = require("../../controllers/auth");

const router = express.Router();

router.get("/all", userController.getAllUsers);
router.get("/countries", userController.getCountries);
router.get("/items", itemsController.getAllItemsWithoutOrder);

router.use("/auth", auth.protect);



module.exports = router;
