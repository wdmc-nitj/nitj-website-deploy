const studyProgrammes = require('../models/study_programmes');

const getAllstudyProgrammes=async(req,res)=>{
    try {
        const result=await studyProgrammes.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptstudyProgrammes=async(req,res)=>{
    try {
        const result=await studyProgrammes.find({show:true,programmeName:req.params.dept});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addstudyProgrammes=async(req,res)=>{
    const StudyProgrammes=new studyProgrammes({...req.body});
    try {
        const result=await StudyProgrammes.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const deletestudyProgrammes=async(req,res)=>{
    try {
        const result=await studyProgrammes.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("studyProgrammes deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addStudyProgramme=async(req,res)=>{
    try {
        result=await studyProgrammes.findOneAndUpdate({programmeName: req.params.programmeName},{$push: {programmes: req.body}});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports={getAllstudyProgrammes,getByDeptstudyProgrammes,addStudyProgramme,deletestudyProgrammes,addstudyProgrammes}
