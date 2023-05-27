const express = require("express");
const router = express.Router();
const {
    getAll,
    postResource,
    getSingle,
    updateSingle,
    deleteSingle

} = require("../controller/presEvalController.js");




// get all
router.get('/', getAll)


// post
router.post('/', postResource)

// get a single resource
router.post("/:id", getSingle)

// update a resource
router.patch("/:id", updateSingle)

// delete a resource
router.delete("/:id", deleteSingle)

module.exports = router;