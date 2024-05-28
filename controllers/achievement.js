const Achievement= require('../models/Achievement')

const getAllAchievement=async(req,res)=>{

    try {
        const result=await Achievement.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdAchievement=async(req,res)=>{

    try {
        const result=await Achievement.find(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptAchievement=async(req,res)=>{
    try {
        const result=await Achievement.find({show:true,department:req.params.dept});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addAchievement=async(req,res)=>{
    const achievement=new Achievement({...req.body,department:req.params.dept});

    try {
        const result=await achievement.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deleteAchievement=async(req,res)=>{
    try {
        const result=await Achievement.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Achievement deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updateAchievement=async(req,res)=>{
    try {
        const result=await Achievement.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Achievement updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllAchievement,getByDeptAchievement,getByIdAchievement,updateAchievement,deleteAchievement,addAchievement}

