const express= require("express");
const morgan= require("morgan");
const createHttpErrors= require('http-errors');
const connectFlash= require('connect-flash');
const session= require('express-session');
const passport = require("passport");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));


// Initialize session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            // secure: true "for deployment"
            httpOnly: true, 
        }
    })
)
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport.auth");

// Initialize connect flash
app.use(connectFlash());
app.use((req,res,next)=>{
    res.locals.messages=req.flash();
    next();
})

app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));


app.use((req,res,next)=>{
    next(createHttpErrors.NotFound());
});

app.use((error, req, res, next)=>{
    error.status=error.status || 500;
    res.status(error.status);
    res.render("error_40x", {error});
});

module.exports= app;

