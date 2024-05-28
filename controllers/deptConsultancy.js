const ConsultancySchema = require("../models/deptConsultancy");

const getAllConsultancy = async (req, res) => {
    try {
        const result = await ConsultancySchema.find({ show: true },).sort({order:1});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdConsultancy = async (req, res) => {
    try {
        const result = await ConsultancySchema.find({ _id: req.params.id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptConsultancy = async (req, res) => {
    try {
        const result = await ConsultancySchema.find({ show: true, department: req.params.dept }).sort({order:1});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports = {getAllConsultancy,getByDeptConsultancy,getByIdConsultancy};