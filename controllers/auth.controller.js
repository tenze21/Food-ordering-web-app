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

// Controller to display the user's profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Assuming req.user holds the authenticated user's info
        res.render('userProfile', { user });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error loading profile');
        res.redirect('/user/home');
    }
};

// Controller to update the user's profile
exports.updateProfile = async (req, res) => {
    const { name, email, bio } = req.body;

    try {
        // Find the user by ID and update their profile
        await User.findByIdAndUpdate(req.user.id, { name, email, bio });

        req.flash('success', 'Profile updated successfully');
        res.redirect('/user/profile');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error updating profile');
        res.redirect('/user/profile');
    }
};


