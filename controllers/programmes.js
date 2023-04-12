const Programmes = require('../models/deptProgrammes');

const getAllProgrammes=async(req,res)=>{
    try {
        const result=await Programmes.find({department:req.params.dept});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdProgrammes=async(req,res)=>{
    try {
        const result=await Programmes.find(req.params.id);
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptProgrammes=async(req,res)=>{
    try {
        const result=await Programmes.find({show:true,department:req.params.dept});
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addProgrammes=async(req,res)=>{
    const Programmes = new Programmes({...req.body,department:req.params.dept});

    try {
        const result=await Programmes.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const deleteProgrammes=async(req,res)=>{
    try {
        const result=await Programmes.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Programmes deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const updateProgrammes=async(req,res)=>{
    try {
        const result=await Programmes.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Programmes updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports={getAllProgrammes,getByDeptProgrammes,getByIdProgrammes,updateProgrammes,deleteProgrammes,addProgrammes}

