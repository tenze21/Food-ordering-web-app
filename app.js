const express = require("express");
const morgan = require("morgan");
const createHttpErrors = require("http-errors");
const connectFlash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const { ensureLoggedIn } = require("connect-ensure-login");

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
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      // secure: true "for deployment"
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passport.auth");

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Initialize connect flash
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use("/", require("./routes/auth.route"));
app.use(
  "/user",
  ensureLoggedIn({ redirectTo: "/" }),
  require("./routes/user.route")
);
app.use(
  "/admin",
  ensureLoggedIn({ redirectTo: "/" }),
  ensureAdmin,
  require("./routes/admin.route")
);

app.use("/menu", ensureLoggedIn({ redirectTo: "/" }), require("./routes/menu.route"));

app.use((req, res, next) => {
  next(createHttpErrors.NotFound());
});

app.use((error, req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render("error_40x", { error });
  console.log(error);
});

app.use('/images', express.static(''))
// app.use('/api/food', foodRoutes);
// app.use('/api/drink', drinkRoutes);

function ensureAdmin(req, res, next) {
  if (req.user.role === "admin") {
    next();
  } else {
    res.redirect("/user/home");
  }
}

module.exports = app;
