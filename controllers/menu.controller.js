const Food= require('../models/food.model');
const Drink= require('../models/drink.model');

exports.getFood= async(req,res,next)=>{
  try {
      const foods = await Food.find();
      res.status(200).json(foods);
  } catch (error) {
      next(error);
  }
}

exports.getDrinks= async(req,res,next)=>{
  try {
      const drinks = await Drink.find();
      res.status(200).json(drinks);
  } catch (error) {
      next(error);
  }
}


//Update a drink
exports.updateDrink = async (req, res) => {
  try {
    const drinkId = req.params.id;
    const updatedDrink = await Drink.findByIdAndUpdate(drinkId, req.body, {new: true});

    if(!updatedDrink){
      return res.status(404).json({message : "Drink not found"});
    }

    res.status(200).json(updatedDrink);
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

//Updating a food item
exports.updateFood = async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedFood = await Food.findByIdAndUpdate(menuId, req.body, { new: true});

    if (!updatedFood){
      return res.status(404).json({message : 'Menu Item not found'})
    }

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
}