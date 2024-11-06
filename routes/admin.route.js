const router = require("express").Router();
const adminPagesController = require("../controllers/adminPages.controller");
const orderController = require("../controllers/orderApi.controller");
const menuController = require("../controllers/menu.controller");

router.get("/food", adminPagesController.getFoodPage);
router.get("/drinks", adminPagesController.getDrinksPage);
router.get("/orders", adminPagesController.getOrders);
router.route("/order/:id").put(orderController.updateOrderStatus).delete(orderController.deleteOrder);
router.route("/food/new").get(adminPagesController.getAddFoodPage).post(menuController.uploadFood, menuController.addFood);
router.route("/drinks/new").get(adminPagesController.getAddDrinksPage).post(menuController.uploadDrink, menuController.addDrink);
router.get("/food/:id", adminPagesController.getUpdateFoodPage);
router.get("/drinks/:id", adminPagesController.getUpdateDrinksPage);

module.exports = router;

