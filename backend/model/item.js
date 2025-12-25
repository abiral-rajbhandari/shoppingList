const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true, // Removes whitespace from both ends
    },
    quantity: {
      type: Number,
      required: true,
      min: 0, // Quantity cannot be negative
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Price cannot be negative
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
