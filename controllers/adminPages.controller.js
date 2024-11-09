const Drinks = require("../models/drink.model");
const Food = require("../models/food.model");
const Order = require("../models/order.model");
const Review = require("../models/review.model");
const User = require("../models/user.model");


exports.getFoodPage = async (req, res, next) => {
  res.render("adminHomeFood");
};

exports.getDrinksPage = async (req, res, next) => {
  res.render("adminHomeDrinks");
};


exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user"); // Populate user details directly
    const totalPrice = orders.reduce(
      (total, order) => total + order.totalPrice,
      0
    );
    res.render("adminOrders", { orders, totalPrice });
  } catch (err) {
    next(err);
  }
};

exports.getAddFoodPage = async (req, res) => {
  res.render("addFood");
};
exports.getAddDrinksPage = async (req, res) => {
  res.render("addDrinks");
};

exports.getUpdateFoodPage = async (req, res, next) => {
  try {
    const food= await Food.findById(req.params.id);
    res.render("adminEditFood", { food });
  } catch (err) {
    next(err);
  }
};
exports.getUpdateDrinksPage = async (req, res, next) => {
  try {
    const drink= await Drinks.findById(req.params.id);
    res.render("adminEditDrink", { drink });
  } catch (err) {
    next(err);
  }
};

exports.getReviewsPage = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate("user"); // Populate user details directly
    res.render("adminReviews", { reviews });
  } catch (err) {
    next(err);
  }
};

exports.getUserProfile= async (req, res, next) => {
  const user= await User.findById(req.params.id);
  res.render("adminUserProfile", { user });
}