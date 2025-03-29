const router = require("express").Router();
const Todo = require("../models/todo");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
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
    console.log(req.user.id);
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found!", isSuccessMessage: false });
    }

    const todoData = {
      userId: req.user.id,
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

router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res
        .status(404)
        .json({ message: "TODO not found", isSuccessMessage: false });
    }

    if (req.body.userId === todo.userId) {
      const updatedTODO = await Todo.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      console.log(updatedTODO);

      res
        .status(200)
        .json({ message: "TODO Updated Succesfully", isSuccessMessage: true });
    } else {
      res.status(403).json({
        message: "Operation not allowed! Cannot delete others TODO",
        isSuccessMessage: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error! Please try again later!",
      isSuccessMessage: false,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res
        .status(404)
        .json({ message: "TODO not found", isSuccessMessage: false });
    }

    if (req.body.userId === todo.userId) {
      const deleteTodo = await Todo.findById(todo._id);
      await deleteTodo.deleteOne();
      res
        .status(200)
        .json({ message: "TODO Deleted Succesfully", isSuccessMessage: true });
    } else {
      res.status(403).json({
        message: "Operation not allowed! Cannot delete others TODO",
        isSuccessMessage: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error! Please try again later!",
      isSuccessMessage: false,
    });
  }
});

module.exports = router;
