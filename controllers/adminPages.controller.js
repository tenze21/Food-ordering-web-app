
exports.getFoodPage = async(req,res,next)=>{
    res.render("adminHomeFood");
}

exports.getDrinksPage = async(req, res, next)=>{
    res.render("adminHomeDrinks");
}