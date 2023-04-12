
const description = require("../models/deptDescription");

const getByDeptDescription = async(req,res)=>{
    try {
        const result = await description.findOne({department:req.params.dept,show:true});
        return res.status(200).json(result);
    } catch (error) {

        res.status(500).json("Some error Occurred");
    }
}

module.exports = {getByDeptDescription};