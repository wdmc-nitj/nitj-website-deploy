const AcademicCalendar= require('../models/academicCalendar')

const getAllAcademicCalendar=async(req,res)=>{
    try {
        const result=await AcademicCalendar.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addAcademicCalendar=async(req,res)=>{
    const newAcademicCalendar = new AcademicCalendar(req.body);

    try {
        const result = await newAcademicCalendar.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const deleteAcademicCalendar=async(req,res)=>{
    try {
        const result=await AcademicCalendar.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Academic Calendar deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const updateAcademicCalendar=async(req,res)=>{
    try {
        const result=await AcademicCalendar.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Academic Calendar updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports={getAllAcademicCalendar,updateAcademicCalendar,deleteAcademicCalendar,addAcademicCalendar}

