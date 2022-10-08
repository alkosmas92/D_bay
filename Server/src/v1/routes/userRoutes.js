// In src/v1/routes/userRoutes.js
const express = require("express");
const userController = require("../../controllers/userControllers");
const itemsController = require("../../controllers/itemControllers");
const auth = require("../../controllers/auth");
const router = express.Router();

// router.get("/all", userController.getAllUsers);
router.get("/countries", userController.getCountries);
// router.get("/items", itemsController.getAllItemsWithoutOrder);
router.get("/tourist", itemsController.getAllItemsWithoutOrder);

router.post("/signin", auth.createAdmin)
router.post("/signup", auth.createAdmin)
router.use("/auth" , itemsController.itemUpdateTime)
router.post("/signup", auth.signup);
router.post("/signin", auth.signin);
router.use("/auth", auth.protect);
router.post("/auth/user" ,userController.sellerBidder )
router.get("/auth/getitembyid" ,itemsController.getItemById )


router.get("/auth/seller/:userid/item", itemsController.getAllCategories);
router.get("/auth/seller/:userid/items", itemsController.getAllItemsWithoutOrder);
router.get("/auth/seller/:userid/items/:itemid", itemsController.findLengthOfBinds);
router.get("/auth/seller/:userid/yourProducts/selled", itemsController.findSelled);
router.get("/auth/seller/:userid/yourProducts/buy", itemsController.findBuy);
router.get("/auth/seller/:userid/yourProducts/active", itemsController.findActivebyItemid);

router.patch("/auth/seller/:userid/updateItem", itemsController.updateItem);
router.patch("/auth/seller/:userid/updateCategoryItem", itemsController.updateItemCategory);

router.delete("/auth/seller/:userid/delete", itemsController.deleteItem);


router.get("/auth/bidder/items", itemsController.getAllItemsWithoutOrder);
router.get("/auth/bidder/:itemid", itemsController.getItemCategory)
router.get("/auth/bidder/:itemid/country",userController.getCountry)
router.post("/auth/bidder/:itemid/selled",itemsController.selledItem);
router.patch("/auth/bidder/:itemid/updatefalse",itemsController.updateItemF);


router.post("/auth/seller/:userid/createCategoryItem", itemsController.createCategoryItem);
router.post("/auth/seller/:userid/createItem", itemsController.createItems);

router.post("/auth/bidder/:itemid/createbid", itemsController.createBid);

router.patch("/auth/seller/:userid/items/:itemid", itemsController.updateItem);







module.exports = router;
