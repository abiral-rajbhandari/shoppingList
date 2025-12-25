const Item = require("../model/item");

//****************** GET ALL ITEMS (for logged-in user) ******************//
const getAllItems = async (request, response) => {
  try {
    // request.userId comes from the auth middleware
    // Find all items that belong to this user
    const items = await Item.find({ userId: request.userId }).sort({ createdAt: -1 });
    
    // .sort({ createdAt: -1 }) sorts by creation date, newest first
    // -1 means descending order (newest to oldest)
    // 1 would mean ascending order (oldest to newest)
    
    response.status(200).json(items);
  } catch (error) {
    console.error("Get Items Error:", error);
    response.status(500).json({ message: "Failed to fetch items." });
  }
};

//****************** CREATE NEW ITEM ******************//
const createItem = async (request, response) => {
  try {
    // Extract data from request body
    const { itemName, quantity, price } = request.body;
    
    // Validate required fields
    if (!itemName || quantity === undefined || price === undefined) {
      return response.status(400).json({ message: "All fields are required." });
    }
    
    // Create new item in database
    const newItem = await Item.create({
      userId: request.userId, // From auth middleware
      itemName: itemName,
      quantity: quantity,
      price: price,
      completed: false, // Default value
    });
    
    response.status(201).json({ 
      message: "Item created successfully.", 
      item: newItem 
    });
  } catch (error) {
    console.error("Create Item Error:", error);
    response.status(500).json({ message: "Failed to create item." });
  }
};

//****************** UPDATE ITEM ******************//
const updateItem = async (request, response) => {
  try {
    // Get item ID from URL parameters
    // Example: PUT /api/items/abc123 -> request.params.id = "abc123"
    const itemId = request.params.id;
    
    // Extract fields to update from request body
    const { itemName, quantity, price, completed } = request.body;
    
    // Find item by ID and check if it belongs to the logged-in user
    const item = await Item.findOne({ _id: itemId, userId: request.userId });
    
    if (!item) {
      return response.status(404).json({ message: "Item not found." });
    }
    
    // Update only the fields that were provided
    if (itemName !== undefined) item.itemName = itemName;
    if (quantity !== undefined) item.quantity = quantity;
    if (price !== undefined) item.price = price;
    if (completed !== undefined) item.completed = completed;
    
    // Save the updated item
    await item.save();
    
    response.status(200).json({ 
      message: "Item updated successfully.", 
      item: item 
    });
  } catch (error) {
    console.error("Update Item Error:", error);
    response.status(500).json({ message: "Failed to update item." });
  }
};

//****************** DELETE ITEM ******************//
const deleteItem = async (request, response) => {
  try {
    // http://localhost:3000/api/items/${item._id}
    // id = item._id
    const itemId = request.params.id; 
    
    // Find and delete the item
    // Ensure the item belongs to the logged-in user
    const deletedItem = await Item.findOneAndDelete({ 
      _id: itemId, 
      userId: request.userId 
    });
    
    if (!deletedItem) {
      return response.status(404).json({ message: "Item not found." });
    }
    
    response.status(200).json({ message: "Item deleted successfully." });
  } catch (error) {
    console.error("Delete Item Error:", error);
    response.status(500).json({ message: "Failed to delete item." });
  }
};

//****************** TOGGLE COMPLETE STATUS ******************//
const toggleComplete = async (request, response) => {
  try {
    const itemId = request.params.id;
    
    // Find the item
    const item = await Item.findOne({ _id: itemId, userId: request.userId });
    
    if (!item) {
      return response.status(404).json({ message: "Item not found." });
    }
    
    // Toggle the completed status
    item.completed = !item.completed;
    await item.save();
    
    response.status(200).json({ 
      message: "Item status updated.", 
      item: item 
    });
  } catch (error) {
    console.error("Toggle Complete Error:", error);
    response.status(500).json({ message: "Failed to update item status." });
  }
};

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  toggleComplete,
};
