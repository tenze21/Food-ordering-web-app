exports.getFoodPage = async(req,res,next)=>{
    res.render("adminHomeFood");
}

exports.getDrinksPage = async(req, res, next)=>{
    res.render("adminHomeDrinks");
}

const Order = require("../models/order.model");
const User= require("../models/user.model");

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user'); // Populate user details directly
    const totalPrice= orders.reduce((total, order) => total + order.totalPrice, 0);
    res.render('adminOrders', { orders, totalPrice });
  } catch (err) {
    next(err);
  }
};

exports.getAddFoodPage= async(req, res)=>{
  res.render("addFood");
}
exports.getAddDrinksPage= async(req, res)=>{
  res.render("addDrinks");
}