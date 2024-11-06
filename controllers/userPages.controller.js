const Order = require("../models/order.model");
const User = require("../models/user.model");
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
  const orders = await Order.find({ user: req.user._id });
  const totalPrice = orders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );
  res.render("userOrders", { orders, totalPrice });
};

exports.getProfile = async (req, res, next) => {
  res.render("userProfile", { user: req.user });
};

exports.updateProfile = async (req, res) => {
  const { profile, email, contactNumber, address, designation, gender } =
    req.body;
  const user = await User.findById(req.user._id);
  try {
    if (user) {
      if (profile && profile !== "undefined") {
        user.profile = profile;
      }
      user.email = email;
      user.contactNumber = contactNumber;
      user.address = address;
      user.designation = designation;
      user.gender = gender;

      await user.save();
      res.status(200).json({ message: "Profile updated successfully" });
    } else {
      throw createHttpError(404, "User not found");
    }
  } catch (err) {
    console.log(err);
  }
};
