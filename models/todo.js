const mongoose = require("mongoose");

const todoScheme = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    max: 50,
  },
  description: {
    type: String,
    max: 200,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", todoScheme);
