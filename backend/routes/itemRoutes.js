const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  toggleComplete,
} = require("../controllers/itemController");

// All routes here are protected - user must be logged in
// verifyToken middleware runs before each route handler

// GET /api/items - Get all items for logged-in user
router.get("/", verifyToken, getAllItems);

// POST /api/items - Create new item
router.post("/", verifyToken, createItem);

// PUT /api/items/:id - Update specific item
// :id is a route parameter (placeholder for actual item ID)
router.put("/:id", verifyToken, updateItem);

// DELETE /api/items/:id - Delete specific item
router.delete("/:id", verifyToken, deleteItem);

// PATCH /api/items/:id/toggle - Toggle item's completed status
router.patch("/:id/toggle", verifyToken, toggleComplete);

module.exports = router;
