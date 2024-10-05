const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose')

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const uri = "mongodb+srv://shailesh714:Shailesh714@aurora.cl1b2.mongodb.net/?retryWrites=true&w=majority&appName=Aurora";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define a Mongoose schema and model
const itemSchema = new mongoose.Schema({
  image: String,
  text: String,
  link: String,
});

const Item = mongoose.model("Item", itemSchema);

// API route to get data
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API route to add data
app.post('/api/items', async (req, res) => {
  const { image, text, link } = req.body;

  const newItem = new Item({
    image,
    text,
    link
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
