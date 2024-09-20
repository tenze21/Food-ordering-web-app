const express= require("express");
const morgan= require("morgan");
const userRouter = require('./routes/user.routes')

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/users', userRouter)

module.exports= app;

