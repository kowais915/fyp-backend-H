const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/apiRoutes");
const adminRouter = require("./routes/adminRoutes");
const facultyRouter = require("./routes/facultyRouter");
const venueRouter = require("./routes/venuesRoutes")
const panelRouter = require("./routes/panelRouter")
const presEvalRouter = require("./routes/presEvalRouter")

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
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/faculty", facultyRouter);
app.use("/api/venue", venueRouter);
app.use("/api/panels", panelRouter);
app.use("/api/presEvals", presEvalRouter)



app.get("/", (req, res) => {
  res.json({msg:"Welcome to the FYP Management Server"})
})