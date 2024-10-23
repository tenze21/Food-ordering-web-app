const Order = require("../models/order.model");
exports.getHome = async (req, res, next) => {
  res.render("index");
};

exports.getDrinks = async (req, res, next) => {
  res.render("drinks");
};

exports.getCart = async (req, res, next) => {
  res.render("cart");
};

exports.getOrders = async (req, res, next) => {
    const orders = await Order.find({user: req.user._id});
    const totalPrice = orders.reduce((total, order) => total + order.totalPrice, 0);
  res.render("userOrders", {orders, totalPrice});
};
