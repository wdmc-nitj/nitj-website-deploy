const HOD= require('../models/HodMessage')

const getAllHOD=async(req,res)=>{

    try {
        const result=await HOD.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdHOD=async(req,res)=>{

    try {
        const result=await HOD.find(req.params.id);
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptHOD=async(req,res)=>{
    try {
        const result=await HOD.find({show:true,department:req.params.dept});
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addHOD=async(req,res)=>{
    const hod=new HOD({...req.body,department:req.params.dept});

    try {
        const result=await hod.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deleteHOD=async(req,res)=>{
    try {
        const result=await HOD.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("HOD deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updateHOD=async(req,res)=>{
    try {
        const result=await HOD.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("HOD updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllHOD,getByDeptHOD,getByIdHOD,updateHOD,deleteHOD,addHOD}

