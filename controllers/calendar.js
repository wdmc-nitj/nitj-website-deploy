const DeptCalendar= require('../models/deptCalender');

const getAllDeptCalendar=async(req,res)=>{
    try {
        const result=await DeptCalendar.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addDeptCalendar=async(req,res)=>{
    const newDeptCalendar = new DeptCalendar(req.body);

    try {
        const result = await newDeptCalendar.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const deleteDeptCalendar=async(req,res)=>{
    try {
        const result=await DeptCalendar.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Dept Calendar deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const updateDeptCalendar=async(req,res)=>{
    try {
        const result=await DeptCalendar.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Dept Calendar updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports={getAllDeptCalendar,updateDeptCalendar,deleteDeptCalendar,addDeptCalendar}

