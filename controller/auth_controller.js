let database = require("../database");
const passport = require("../middleware/passport");


let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/login",
  }),

  registerSubmit: (req, res) => {
    userEmail = req.body.email
    userPassword = req.body.password
    // if (userEmail !== 0)
  },
};

module.exports = authController;
