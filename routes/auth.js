const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Hi");
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (user && user.email == req.body.email)
      return res.status(409).json({ message: "Email already exists" });
    if (user && user.username == req.body.username)
      return res.status(409).json({ message: "Username already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const appUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    const userData = await appUser.save();
    res.status(200).json({ message: "User Created Succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const vaildPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (vaildPassword) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token, message: "Login Success" });
    } else {
      res.status(400).json({ message: "Invalid Password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
