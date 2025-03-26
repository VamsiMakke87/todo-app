const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be atleast of length 8"],
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
