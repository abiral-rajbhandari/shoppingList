const dotenv = require('dotenv');
dotenv.config(); // process.env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

//* Call express() and load it in app variable
const app = express();

//* Default Middleare Implementation: 
//* 1. converting incoming req back to js object and attach in req.body
//* 2. CORS
app.use(express.json()); 
app.use(cors({
    origin: 'https://localhost:5173/'
}));  

//* Base Route:
app.use("/api/auth", authRoutes);

//* Database Connection:
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL)
.then(() => console.log("Database is connected..."))
.catch(() => console.log("Failed to connect database..."))

//* Start Server & Listen to all the incoming requests
const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`Server is listening on port ${PORT}...`)
})

