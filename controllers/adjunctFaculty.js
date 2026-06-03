const AdjunctFaculty= require('../models/AdjunctFaculty')

const getAllAdjunctFaculty=async(req,res)=>{

    try {
        const result=await AdjunctFaculty.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdAdjunctFaculty=async(req,res)=>{

    try {
        const result=await AdjunctFaculty.findById(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json("Error: " + error);
    }
}

const getByDeptAdjunctFaculty=async(req,res)=>{
    try {
        const result=await AdjunctFaculty.find({show:true,department:req.params.dept}).sort('-rollNumber');
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addAdjunctFaculty=async(req,res)=>{
    const AdjunctFaculty=new AdjunctFaculty({...req.body,department:req.params.dept});

    try {
        const result=await AdjunctFaculty.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deleteAdjunctFaculty=async(req,res)=>{
    try {
        const result=await AdjunctFaculty.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("AdjunctFaculty deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updateAdjunctFaculty=async(req,res)=>{
    try {
        const result=await AdjunctFaculty.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("AdjunctFaculty updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllAdjunctFaculty,getByDeptAdjunctFaculty,getByIdAdjunctFaculty,updateAdjunctFaculty,deleteAdjunctFaculty,addAdjunctFaculty}
