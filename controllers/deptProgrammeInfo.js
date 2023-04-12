const programmeInfo = require('../models/deptProgrammeInfo.js');

const getAllprogrammeInfo = async (req, res) => {
    try {
        const result = await programmeInfo.find({ show: true },);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdprogrammeInfo = async (req, res) => {
    try {
        const result = await programmeInfo.find({ _id: req.params.id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptprogrammeInfo = async (req, res) => {
    try {
        const result = await programmeInfo.find({department: req.params.dept });
        
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports = {getAllprogrammeInfo,getByDeptprogrammeInfo,getByIdprogrammeInfo};