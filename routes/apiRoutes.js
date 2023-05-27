const express = require("express");
const router = express.Router();




// get all
router.get('/', (req, res) => {
    res.json({msg: " This is all you have in your database"})
})


// post
router.post('/', (req, res) => {
    res.json({msg: " You posted a resource to the database."})
})

// get a single resource
router.post("/:id", (req, res) => {
    res.json({msg: "You got a single resource"})
})

// update a resource
router.patch("/:id", (req, res) => {
    res.json({msg: "You updated a resource"})
})

// delete a resource
router.delete("/:id", (req, res) => {
    res.json({msg: "You deleted a resource"})
})

module.exports = router;