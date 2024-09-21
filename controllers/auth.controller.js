exports.getLogin= async (req,res, next)=>{
    res.render("login");
}

exports.getRegister=async(req, res, next)=>{
    res.render("register");
}