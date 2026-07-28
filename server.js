const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🚀 URL Shortener API is Running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});