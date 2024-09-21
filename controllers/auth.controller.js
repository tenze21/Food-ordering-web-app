const User=require('../models/user.model');

exports.getLogin= async (req,res, next)=>{
    res.render("login");
}

exports.getRegister=async(req, res, next)=>{
    res.render("register");
}

exports.createUser = async(req, res) => {
    try {
        const user = await User.create(req.body);
        console.log(req.body.name)
        res.json({ data: user, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}