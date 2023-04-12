const Placement= require('../models/Placement')

const getAllPlacement=async(req,res)=>{

    try {
        const result=await Placement.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdPlacement=async(req,res)=>{

    try {
        const result=await Placement.find(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptPlacement=async(req,res)=>{
    try {
        const result=await Placement.find({show:true,department:req.params.dept});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addPlacement=async(req,res)=>{
    const placemnt=new Placement({...req.body,department:req.params.dept});

    try {
        const result=await placemnt.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deletePlacement=async(req,res)=>{
    try {
        const result=await Placement.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Placement deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updatePlacement=async(req,res)=>{
    try {
        const result=await Placement.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Placement updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllPlacement,getByDeptPlacement,getByIdPlacement,updatePlacement,deletePlacement,addPlacement}
