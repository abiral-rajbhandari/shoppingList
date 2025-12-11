const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

/*
To make sure your schema works correctly, remember to use the capitalized built-in Mongoose Schema Types (like String, Number, Boolean, etc.) instead of the lowercase JavaScript primitives.
The curly braces ({}) in your mongoose.Schema definition are used because they are defining a standard JavaScript object.
*/
