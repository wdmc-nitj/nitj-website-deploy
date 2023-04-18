const Student= require('../models/deptStudents')

const getAllStudent=async(req,res)=>{

    try {
        const result=await Student.find({show:true});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}
const getByIdStudent=async(req,res)=>{

    try {
        const result=await Student.find(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptStudent=async(req,res)=>{
    try {
        const result=await Student.find({show:true,department:req.params.dept});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const addStudent=async(req,res)=>{
    const student=new Student({...req.body,department:req.params.dept});

    try {
        const result=await student.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const deleteStudent=async(req,res)=>{
    try {
        const result=await Student.findByIdAndUpdate(req.params.id,{$set:{show:false}});
        res.status(200).json("Student deleted succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

const updateStudent=async(req,res)=>{
    try {
        const result=await Student.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).json("Student updated succesfully")
    } catch (error) {
        res.status(400).json("Error: " + error);
        
    }
}

module.exports={getAllStudent,getByDeptStudent,getByIdStudent,updateStudent,deleteStudent,addStudent}
