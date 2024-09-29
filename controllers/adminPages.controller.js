exports.getFood = (req,res,next)=>{
    res.render("adminHomeFood");
}

exports.getDrinks= (req, res, next)=>{
    res.render("adminHomeDrinks")
}