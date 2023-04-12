const awards = require('../models/awardsAndHonors');

const getAllAwards=async(req,res)=>{
    try {
        const result=await awards.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdAwards=async(req,res)=>{

    try {
        const result=await awards.find(req.params.id);
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptAwards=async(req,res)=>{
    try {
        const result=await awards.find({show:true,department:req.params.dept});
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addAwards=async(req,res)=>{
    const awards = new awards({...req.body,department:req.params.dept});

    try {
        const result=await awards.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const deleteAwards=async(req,res)=>{
    try {
        const result=await awards.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Awards deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const updateAwards=async(req,res)=>{
    try {
        const result=await awards.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Awards updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports={getAllAwards,getByDeptAwards,getByIdAwards,updateAwards,deleteAwards,addAwards}

