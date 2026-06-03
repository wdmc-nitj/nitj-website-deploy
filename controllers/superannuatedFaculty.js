const SuperannuatedFaculty= require('../models/SuperannuatedFaculty')

const getAllSuperannuatedFaculty=async(req,res)=>{

    try {
        const result=await SuperannuatedFaculty.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdSuperannuatedFaculty=async(req,res)=>{

    try {
        const result=await SuperannuatedFaculty.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json("Error: " + error);
    }
}

const getByDeptSuperannuatedFaculty=async(req,res)=>{
    try {
        const result=await SuperannuatedFaculty.find({show:true,department:req.params.dept}).sort('-rollNumber');
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addSuperannuatedFaculty=async(req,res)=>{
    const SuperannuatedFaculty=new SuperannuatedFaculty({...req.body,department:req.params.dept});

    try {
        const result=await SuperannuatedFaculty.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deleteSuperannuatedFaculty=async(req,res)=>{
    try {
        const result=await SuperannuatedFaculty.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("SuperannuatedFaculty deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updateSuperannuatedFaculty=async(req,res)=>{
    try {
        const result=await SuperannuatedFaculty.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("SuperannuatedFaculty updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllSuperannuatedFaculty,getByDeptSuperannuatedFaculty,getByIdSuperannuatedFaculty,updateSuperannuatedFaculty,deleteSuperannuatedFaculty,addSuperannuatedFaculty}
