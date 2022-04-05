const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// R E G I S T E R

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassWord = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassWord,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// L O G I N
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong Username or Password");
    // Compare the password with the user password
    const validated = await bcrypt.compare(req.body.password, user.password)
    !validated && res.status(400).json("Wrong Username or Password")
    // spread operator to copy the user leaving out the password in the return by using the document
    const { password, ...newInfo } = user._doc;
    res.status(200).json(newInfo)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
