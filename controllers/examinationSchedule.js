const Examination = require('../models/examSchedule');

const getAllexamination=async(req,res)=>{
    try {
        const result=await Examination.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptexamination=async(req,res)=>{
    try {
        const result=await Examination.find({show:true,departmentName : req.params.shortterm});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addexamination=async(req,res)=>{
    const examination=new Examination({...req.body});
    try {
        const result=await examination.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const deleteexamination=async(req,res)=>{
    try {
        const result=await Examination.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("examination deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports={getAllexamination,getByDeptexamination,deleteexamination,addexamination}