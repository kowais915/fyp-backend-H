const {
    User
} = require("../models/FypModel");


// get all resources
async function getAll (req, res)  {
    const user = await User.find({})
    res.status(200).json(user)
}

// post a resource

async function postResource(req, res){
    const {name, email, password, role} = req.body;

    try{
        const user = await User.create({name, email, password, role})
        res.status(200).json(user)

    }catch(err){
        res.status(400).json({msg:err.message})
    }
}


// get a single resource
async function getSingle (req, res) {
    res.json({msg: "You got a single resource"})
}


// update single
async function updateSingle (req, res){
    res.json({msg: "You updated a resource"})
}


// delete single
async function deleteSingle(req, res){
    res.json({msg: "You deleted a resource"})
}

module.exports = {

    getAll,
    postResource,
    updateSingle,
    getSingle,
    deleteSingle


}