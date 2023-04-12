const Activity= require('../models/Activity')

const getAllActivity=async(req,res)=>{

    try {
        const result=await Activity.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdActivity=async(req,res)=>{

    try {
        const result=await Activity.find(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptActivity=async(req,res)=>{
    try {
        const result=await Activity.find({show:true,department:req.params.dept});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addActivity=async(req,res)=>{
    const activity=new Activity({...req.body,department:req.params.dept});

    try {
        const result=await activity.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deleteActivity=async(req,res)=>{
    try {
        const result=await Activity.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Activity deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updateActivity=async(req,res)=>{
    try {
        const result=await Activity.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Activity updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllActivity,getByDeptActivity,getByIdActivity,updateActivity,deleteActivity,addActivity}

