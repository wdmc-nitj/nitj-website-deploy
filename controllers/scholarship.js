const Scholarship= require('../models/scholarship')

const getAllScholarship=async(req,res)=>{

    try {
        const result=await Scholarship.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdScholarship=async(req,res)=>{

    try {
        const result=await Scholarship.find(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}



const addScholarship=async(req,res)=>{
    const scholarship=new Scholarship({...req.body});

    try {
        const result=await scholarship.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deleteScholarship=async(req,res)=>{
    try {
        const result=await Scholarship.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Scholarship deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updateScholarship=async(req,res)=>{
    try {
        const result=await Scholarship.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Scholarship updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllScholarship,getByIdScholarship,updateScholarship,deleteScholarship,addScholarship}
