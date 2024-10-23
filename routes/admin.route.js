const router = require("express").Router();
const adminPagesController = require("../controllers/adminPages.controller");
const orderController = require("../controllers/orderApi.controller");

router.get("/food", adminPagesController.getFoodPage);
router.get("/drinks", adminPagesController.getDrinksPage);
router.get("/orders", adminPagesController.getOrders);
router.route("/order/:id").put(orderController.updateOrderStatus).delete(orderController.deleteOrder);

module.exports = router;

