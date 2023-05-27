const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routes/apiRoutes");

const app = express();
app.use(express.json());
const PORT = 3000 || process.env.PORT;


// connect to mongodb

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    // listen on port
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    })


  })


// routes
app.use("/api", router);


app.get("/", (req, res) => {
  res.json({msg:"Welcome to the FYP Management Server"})
})