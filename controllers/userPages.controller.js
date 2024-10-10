exports.getHome= async (req, res, next)=>{
    res.render('index');
}

exports.getDrinks= async (req, res, next)=>{
    res.render('drinks');
}

exports.getCart= async (req, res, next)=>{
    res.render('cart');
}