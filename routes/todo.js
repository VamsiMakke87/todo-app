const router = require("express").Router();
const Todo = require("../models/todo");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found!!", isSuccessMessage: false });
    }

    const todos = await Todo.find({ userId: user._id });

    res.status(200).json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error! Please try again later!",
      isSuccessMessage: false,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found!", isSuccessMessage: false });
    }

    const todoData = {
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
    };

    const newTodo = new Todo(todoData);
    await newTodo.save();
    res.status(200).json({ message: "Todo Created Succesfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error! Please try again later!",
      isSuccessMessage: false,
    });
  }
});

module.exports = router;
