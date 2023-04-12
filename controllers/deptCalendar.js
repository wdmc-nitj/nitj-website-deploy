const deptCalendar= require('../models/deptCalender')

const getAllDeptCalendar=async(req,res)=>{
    try {
        const result=await deptCalendar.find({show:true, department: req.params.dept});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports={getAllDeptCalendar};
