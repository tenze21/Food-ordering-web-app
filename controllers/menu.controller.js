const Food = require("../models/food.model");
const Drink = require("../models/drink.model");
const { default: mongoose } = require("mongoose");

exports.getFood = async (req, res, next) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    next(error);
  }
};

exports.getDrinks = async (req, res, next) => {
  try {
    const drinks = await Drink.find();
    res.status(200).json(drinks);
  } catch (error) {
    next(error);
  }
};

// Add Food Item
exports.addFood = async (req, res, next) => {
  try {
    const newFood = await Food.create(req.body); // Create a new food item with the request body data
    // req.flash("success", `"${newFood.title}" added successfully to menu!`); // Success message
    // res.redirect("/admin/food"); // Redirect or send a response
    res.json(newFood);
  } catch (error) {
    res.json({"error": error.message}); // Pass the error to the next middleware
  }
};


// Add Drink Item
exports.addDrink = async (req, res, next) => {
  try {
    const newDrink = await Drink.create(req.body); // Create a new drink item with the request body data
    // req.flash("success", `Drink item "${newDrink.title}" added successfully!`); // Success message
    // res.redirect("/"); // Redirect or send a response
    res.json(newDrink)
  } catch (error) {
    // req.flash("error", "Server error. Could not add drink item."); // Error message
    // next(error); // Pass the error to the next middleware
    res.json({"error": error.message});
  }
};

//Update a drink
exports.updateDrink = async (req, res) => {
  try {
    const drinkId = req.params.id;
    const updatedDrink = await Drink.findByIdAndUpdate(drinkId, req.body, {
      new: true,
    });

    res.status(200).json(updatedDrink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Updating a food item
exports.updateFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const updatedFood = await Food.findByIdAndUpdate(menuId, req.body, {
      new: true,
    });

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


