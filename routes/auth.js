const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Hii");
});

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (user && user.email == req.body.email)
      return res
        .status(409)
        .json({ message: "Email already exists", isSuccessMessage: false });
    if (user && user.username == req.body.username)
      return res
        .status(409)
        .json({ message: "Username already exists", isSuccessMessage: false });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const appUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    const userData = await appUser.save();
    res
      .status(200)
      .json({ message: "User Created Succesfully", isSuccessMessage: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error! Please try again later!",
      isSuccessMessage: false,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", isSuccessMessage: false });
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
      res.status(200).json({
        token,
        message: "Login Success",
        isSuccessMessage: true,
      });
    } else {
      res
        .status(400)
        .json({ message: "Invalid Password", isSuccessMessage: false });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error! Please try again later!",
      isSuccessMessage: false,
    });
  }
});

router.put("/forgotPassword", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", isSuccessMessage: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({
        message: "Password Updated Succesfully",
        isSuccessMessage: true,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error! Please try again later!",
      isSuccessMessage: false,
    });
  }
});

module.exports = router;
