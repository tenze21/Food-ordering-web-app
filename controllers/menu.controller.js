const path = require("path");
const Food = require("../models/food.model");
const Drink = require("../models/drink.model");
const multer = require("multer");

const multerStorageFood = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/food/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const uploadFoodImg = multer({
  storage: multerStorageFood,
  fileFilter: fileFilter,
});
exports.uploadFood = uploadFoodImg.single("image");

const multerStorageDrink = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/drinks/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const uploadDrinkImg = multer({
  storage: multerStorageDrink,
  fileFilter: fileFilter,
});
exports.uploadDrink = uploadDrinkImg.single("image");

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

// Add Food Item
// private/admin
// /menu/food/new
exports.addFood = async (req, res, next) => {
  try {
    const { title, price, description, category } = req.body;
    const image = `/images/food/${req.file.filename}`;
    await Food.create({
      title,
      price,
      description,
      category,
      images: image,
    });
    res.status(200).redirect("/admin/food/new");
  } catch (err) {
    next(err);
  }
};

// Add Drink Item
// private/admin
// /menu/drinks/new
exports.addDrink = async (req, res, next) => {
  try {
    const { title, price, description } = req.body;
    const image = `/images/drinks/${req.file.filename}`;
    await Drink.create({
      title,
      price,
      description,
      images: image,
    });
    res.status(200).redirect("/admin/drinks/new");
  } catch (err) {}
};

//Update a drink
// private/admin
// /menu/drinks/:id
exports.updateDrink = async (req, res) => {
  try {
    const drinkId = req.params.id;
    const { title, price, images, description } = req.body;
    await Drink.findByIdAndUpdate(drinkId, {
      title,
      price,
      images,
      description,
    });

    res.status(200).json({ message: "Menu updated successfully." });
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
    const { title, price, images, description, category } = req.body;
    await Food.findByIdAndUpdate(foodId, {
      title,
      price,
      images,
      description,
      category,
    });

    res.status(200).json({ message: "Menu updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFoodAvailability= async(req, res) =>{
  try {
    await Food.findByIdAndUpdate(req.params.id, req.body);
  } catch (err) {
    next(err);
  }
}
exports.updateDrinkAvailability= async(req, res) =>{
  try {
    await Drink.findByIdAndUpdate(req.params.id, req.body);
  } catch (err) {
    next(err);
  }
}