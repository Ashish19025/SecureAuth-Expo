// server.js

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const {rateLimiter} = require("./middleware/rateLimiter"); // Import the rate limiter middleware
const app = express();
const morgan = require("morgan");


app.use(morgan("dev"));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(helmet());
app.use(rateLimiter);
app.use("/api/users", require("./routes/users"));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
});

app.listen(5000, "0.0.0.0", () => {
  console.log(
    "Server running on port 5000"
  );
});