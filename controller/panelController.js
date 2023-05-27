const {
    User,
    Administrator,
    FacultySpecialization,
    Faculty,
    Student,
    ProjectDomain,
    Rubric,
    Presentation,
    Venue,
    Panel,
    FYPGroup,
    PresentationSchedule,
    Evaluation,
    PresentationEvaluation
} = require("../models/FypModel");

const mongoose = require("mongoose");
const express = require("express");

// get all resources
async function getAll (req, res)  {
    const panel= await Panel.find({})
    res.status(200).json(panel)
}

// post a resource

async function postResource(req, res){
    const {panelId, academicYear, facultyMembers} = req.body;

    try{
        const pan = await Panel.create({panelId, academicYear, facultyMembers})
        res.status(200).json(pan)

    }catch(err){
        res.status(400).json({msg:err.message})
    }
}


// get a single resource
async function getSingle (req, res) {
  
    const { id } = req.params;
   
    // checking the id's validity

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json(
            {
                msg: "404! Oops! Please use a valid ID. "
            }
        )
    }
    const singleSession = await User.findById(id);

    if (!singleSession){

       return res.status(404).json(
            {
                error: "404. We could not find what you were looking for"
            
            
            }
        )
    }

    res.status(200).json(singleSession);
}


// update single
async function updateSingle (req, res){
    // grab the id 
    const {id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err: "404! Invalid ID!"});
    }

    // grabbing the properties
    const {name, email, password, role} = req.body;

    // updating the session if the id is valid
    const updatedSession = await User.findOneAndUpdate({_id:id},
        {
            ...req.body


        })
    if(!updatedSession){
        res.status(404).json({msg: "The session does not exist"});
    }

    res.status(200).json(updatedSession);


}


// delete single
async function deleteSingle(req, res){
    

    const {id } = req.params;


    // checking to see if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "404! Invalid ID"});
    }

    // checking to see if the database has the document user is asking about
    // const targetSession = await Session.findById(id);
    // if(!targetSession){
    //     return res.json({error: "Could not delete the document as it does not exit."})
    // }

    // deleting the document if does exist.dd
    
     const deletedUser = await User.findOneAndDelete({_id:id});

     if(!deletedUser){
            return res.json({msg: "The session has been deleted"})
        }
        // res.json(deleteSession, {msg:"The session has been deleted."});

   res.json(deletedUser);
    
}

module.exports = {

    getAll,
    postResource,
    updateSingle,
    getSingle,
    deleteSingle


}