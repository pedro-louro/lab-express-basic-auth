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

module.exports = router;

