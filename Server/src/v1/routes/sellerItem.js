// In src/v1/routes/userRoutes.js
const express = require("express");

const itemsController = require("../../controllers/itemControllers");
const router = express.Router();

router.get("/auth/seller/:userid/item", itemsController.getAllCategories);
router.get("/auth/seller/:userid/items", itemsController.getAllItemsWithoutOrder);
router.get("/auth/seller/:userid/items/:itemid", itemsController.findLengthOfBinds);

router.post("/auth/seller/:userid/createCategoryItem", itemsController.createCategoryItem);
router.post("/auth/seller/:userid/createItem", itemsController.createItems);

router.patch("/auth/seller/:userid/items/:itemid", itemsController.updateItem);


module.exports = router;
