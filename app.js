const express= require("express");
const morgan= require("morgan");
const userRouter = require('./routes/user.routes')

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use('/', require('./routes/index.route'));
app.use('/auth', require('./routes/auth.route'));

module.exports= app;

