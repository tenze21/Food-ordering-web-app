const User = require("../models/user.model");

exports.getLogin = async (req, res, next) => {
  res.render("login");
};

exports.getRegister = async (req, res, next) => {
  res.render("register");
};

exports.createUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const doesExist = await User.findOne({ email });
    if (doesExist) {
      req.flash("error", `${email} already exist. Do you want to login?`);
      res.redirect("/");
      return;
    }
    const user = await User.create(req.body);
    req.flash("success", `${user.email} registered successfully!`);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};