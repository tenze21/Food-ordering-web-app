const express= require("express");
const morgan= require("morgan");
const createHttpErrors= require('http-errors');
const connectFlash= require('connect-flash');
const session= require('express-session');
const passport = require("passport");
const MongoStore = require("connect-mongo");
const {ensureLoggedIn}= require('connect-ensure-login');

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
        store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            // secure: true "for deployment"
            httpOnly: true, 
        }
    })
)
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport.auth");

app.use((req,res,next)=>{
    res.locals.user=req.user;
    next();
})

// Initialize connect flash
app.use(connectFlash());
app.use((req,res,next)=>{
    res.locals.messages=req.flash();
    next();
})

app.use('/', require('./routes/auth.route'));
app.use('/user', ensureLoggedIn({redirectTo: '/'}),require('./routes/user.route'));


app.use((req,res,next)=>{
    next(createHttpErrors.NotFound());
});

app.use((error, req, res, next)=>{
    error.status=error.status || 500;
    res.status(error.status);
    res.render("error_40x", {error});
});

module.exports= app;

