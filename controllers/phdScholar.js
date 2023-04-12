const PhdScholar= require('../models/PhdScholar')

const getAllPhdScholar=async(req,res)=>{

    try {
        const result=await PhdScholar.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdPhdScholar=async(req,res)=>{

    try {
        const result=await PhdScholar.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json("Error: " + error);
    }
}

const getByDeptPhdScholar=async(req,res)=>{
    try {
        const result=await PhdScholar.find({show:true,department:req.params.dept});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addPhdScholar=async(req,res)=>{
    const phdScholar=new PhdScholar({...req.body,department:req.params.dept});

    try {
        const result=await phdScholar.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deletePhdScholar=async(req,res)=>{
    try {
        const result=await PhdScholar.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("PhdScholar deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updatePhdScholar=async(req,res)=>{
    try {
        const result=await PhdScholar.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("PhdScholar updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllPhdScholar,getByDeptPhdScholar,getByIdPhdScholar,updatePhdScholar,deletePhdScholar,addPhdScholar}
