const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routes/apiRoutes");

const app = express();
app.use(express.json());


// routes
app.listen(3000, () => {
    console.log("Server running on port 3000");
})

// routes
app.use("/api", router);

app.get("/", (req, res) => {
  res.json({msg:"Welcome to the api!"})
})