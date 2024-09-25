const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model")

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try{
        const user = await User.findOne({email});
        if (!user || !(await user.isValidPassword(password))){
          return done(null, false, {message: "Invalid Email or Password!"})
        }else {
          return done(null, user)
        }
      } catch (error){
        done(error)
      }
    }
  )
)

password.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  try{
    const user = await User.findById(id);
    done(null, user)
  } catch(error) {
    done(err, null);
  }
});