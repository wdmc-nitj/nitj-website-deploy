const AcademicNotices= require('../models/academicnotices');

const getAllAcademicNotices=async(req,res)=>{
    try {
        const result=await AcademicNotices.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdAcademicNotices=async(req,res)=>{
    try {
        const result=await AcademicNotices.find(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addAcademicNotices=async(req,res)=>{
    const academicNotices=new AcademicNotices({...req.body});

    try {
        const result=await academicNotices.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const deleteAcademicNotices=async(req,res)=>{
    try {
        const result=await AcademicNotices.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("AcademicNotices deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const updateAcademicNotices=async(req,res)=>{
    try {
        const result=await AcademicNotices.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("AcademicNotices updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports={getAllAcademicNotices,getByIdAcademicNotices,updateAcademicNotices,deleteAcademicNotices,addAcademicNotices}

