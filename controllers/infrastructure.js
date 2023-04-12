const Infrastructure= require('../models/Infrastructure')

const getAllInfrastructure=async(req,res)=>{

    try {
        const result=await Infrastructure.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdInfrastructure=async(req,res)=>{

    try {
        const result=await Infrastructure.find(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptInfrastructure=async(req,res)=>{
    try {
        const result=await Infrastructure.find({show:true,department:req.params.dept});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addInfrastructure=async(req,res)=>{
    const infrastructure=new Infrastructure({...req.body,department:req.params.dept});

    try {
        const result=await infrastructure.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deleteInfrastructure=async(req,res)=>{
    try {
        const result=await Infrastructure.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Infrastructure deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updateInfrastructure=async(req,res)=>{
    try {
        const result=await Infrastructure.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Infrastructure updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllInfrastructure,getByDeptInfrastructure,getByIdInfrastructure,updateInfrastructure,deleteInfrastructure,addInfrastructure}
