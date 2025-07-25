const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orders"));

// Root Route for Health Check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Dynamic Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(Server started on port ${PORT}));
