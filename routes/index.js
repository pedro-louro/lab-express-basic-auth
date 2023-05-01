const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  // const currentUser = req.session.currentUser;
  res.render("index");
});

//custom middleware to get the current logged user
function getCurrentLoggedUser(req, res, next) {
  console.log("I' in the middleware")
  if (req.session.currentUser) {
    next();
  } else {
     res.redirect("/login")
    // app.locals.currentUser = "";
  }
}

router.get("/main", getCurrentLoggedUser, (req, res, next) => {
  res.render("main")
})

router.get("/private", getCurrentLoggedUser, (req, res, next) => {
  res.render("private")
})

module.exports = router;
