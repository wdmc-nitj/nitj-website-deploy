const Alumni = require('../models/Alumni')

const getAllAlumni=async(req,res)=>{

    try {
        const result=await Alumni.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdAlumni=async(req,res)=>{

    try {
        const result=await Alumni.find(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptAlumni=async(req,res)=>{
    try {
        const result=await Alumni.find({show:true,department:req.params.dept});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addAlumni=async(req,res)=>{
    const alumni=new Alumni({...req.body,department:req.params.dept});

    try {
        const result=await alumni.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deleteAlumni=async(req,res)=>{
    try {
        const result=await Alumni.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Alumni deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updateAlumni=async(req,res)=>{
    try {
        const result=await Alumni.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Alumni updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllAlumni,getByDeptAlumni,getByIdAlumni,updateAlumni,deleteAlumni,addAlumni}
