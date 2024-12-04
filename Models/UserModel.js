const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [0, "Age must be greater than or equal to 0"],
  },
});

module.exports = mongoose.model("User", userSchema);
