const Food = require("../models/food.model");
const Drink = require("../models/drink.model");

// get food items on menu
// private
// /menu/food
exports.getFood = async (req, res, next) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    next(error);
  }
};


// get food items on menu
// private
// /menu/drinks
exports.getDrinks = async (req, res, next) => {
  try {
    const drinks = await Drink.find();
    res.status(200).json(drinks);
  } catch (error) {
    next(error);
  }
};

// get add food page
// private/admin
// /admin/food
exports.getAddFoodPage = async (req, res) => {
  res.render('addFood');
}

// get add drink page
// private/admin
// admin/drink
exports.getAddDrinkPage = async (req, res) => {
  res.render('addDrinks');
}

// Add Food Item
// private/admin
// /menu/food/new
exports.addFood = async (req, res, next) => {
  try {
    const newFood = await Food.create(req.body); // Create a new food item with the request body data
    res.json(newFood);
  } catch (error) {
    res.json({"error": error.message}); // Pass the error to the next middleware
  }
};


// Add Drink Item
// private/admin
// /menu/drinks/new
exports.addDrink = async (req, res, next) => {
  try {
    const newDrink = await Drink.create(req.body); // Create a new drink item with the request body data
    res.json(newDrink)
  } catch (error) {
    res.json({"error": error.message});
  }
};

//Update a drink
// private/admin
// /menu/drinks/:id
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
// private/admin
// /menu/food/:id
exports.updateFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const updatedFood = await Food.findByIdAndUpdate(foodId, req.body, {
      new: true, // Return the updated document
      runValidators: true // Ensure validation is applied to the update
    });

    if (!updatedFood) {
      return res.status(404).json({ error: "Food item not found" });
    }

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


