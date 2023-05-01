const router = require("express").Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs")

router.get("/signup", (req,res) => {
  res.render("signup")
})

router.post("/signup", async (req, res) => {
  const {username, password} = req.body;

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await User.create({username, password: hashedPassword})
  res.redirect("/");
})


router.get("/login", (req, res) => {
  res.render("login");
})

router.post("/login", async (req, res) => {
  const {username, password} = req.body;

  //Validation if all fields are filled in
  if(!username || !password) {
    res.render("login", {errorMessage: "Invalid login"});
    return;
  }
  //Validation is user exists in db
  const user = await User.findOne({username});
  if(!user) {
    res.render("login", {errorMessage: "Invalid login"});
    return;
  }

   // Validation for password using bcrypt
   if (bcrypt.compareSync(password, user.password)) {
    req.session.currentUser = user;
    res.redirect("/")
  }
  else {
    //passwords don't match
    res.render("login", {errorMessage: "Invalid login"});
    return;
  }

})

module.exports = router;
