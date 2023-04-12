const curriculum = require('../models/curriculum');

const getAllCurriculum=async(req,res)=>{
    try {
        const result=await curriculum.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptCurriculum=async(req,res)=>{
    try {
        const result=await curriculum.find({show:true,departmentName : req.params.shortterm});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addCurriculum=async(req,res)=>{
    const curriculum=new curriculum({...req.body});
    try {
        const result=await curriculum.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const deleteCurriculum=async(req,res)=>{
    try {
        const result=await curriculum.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("curriculum deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports={getAllCurriculum,getByDeptCurriculum,deleteCurriculum,addCurriculum}