const Staff= require('../models/Staff')

const getAllStaff=async(req,res)=>{

    try {
        const result=await Staff.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdStaff=async(req,res)=>{

    try {
        const result=await Staff.find(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptStaff=async(req,res)=>{
    try {
        const result=await Staff.find({show:true,department:req.params.dept});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addStaff=async(req,res)=>{
    const staff=new Staff({...req.body,department:req.params.dept});

    try {
        const result=await staff.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deleteStaff=async(req,res)=>{
    try {
        const result=await Staff.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Staff deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updateStaff=async(req,res)=>{
    try {
        const result=await Staff.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Staff updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllStaff,getByDeptStaff,getByIdStaff,updateStaff,deleteStaff,addStaff}
