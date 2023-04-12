const specialCentres = require('../models/specialCentres');

const getAllSpecialCentres=async(req,res)=>{
    try {
        const result=await specialCentres.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptSpecialCentres=async(req,res)=>{
    try {
        const result=await specialCentres.find({show:true,shortterm:req.params.shortterm});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addSpecialCentres=async(req,res)=>{
    const SpecialCentres=new specialCentres({...req.body});
    try {
        const result=await SpecialCentres.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const deleteSpecialCentres=async(req,res)=>{
    try {
        const result=await specialCentres.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("SpecialCentres deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addFaculty=async(req,res)=>{
    try {
        const term = req.params.term;
        let result;

        if(term=='faculties')
        result=await specialCentres.findOneAndUpdate({shortterm: req.params.shortterm},{$push: {faculties: req.body}});
        else if(term=='associate_faculties')
        result=await specialCentres.findOneAndUpdate({shortterm: req.params.shortterm},{$push: {associate_faculties: req.body}});
        else if(term=='workers')
        result=await specialCentres.findOneAndUpdate({shortterm: req.params.shortterm},{$push: {workers: req.body}});
        else if(term=='special_links')
        result=await specialCentres.findOneAndUpdate({shortterm: req.params.shortterm},{$push: {specialLinks: req.body}});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports={getAllSpecialCentres,getByDeptSpecialCentres,addFaculty,deleteSpecialCentres,addSpecialCentres}
