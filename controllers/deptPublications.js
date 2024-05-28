const Publications = require("../models/deptPublication");

const getAllPublication = async (req, res) => {
    try {
        const result = await Publications.find({ show: true },).sort({order:1});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdPublication = async (req, res) => {
    try {
        const result = await Publications.find({ _id: req.params.id });
        res.status(200).json({ data: result, validation: {status:req.user} });
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptPublication = async (req, res) => {
    try {
        const result = await Publications.find({ show: true, department: req.params.dept }).sort({order:1});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports = {getAllPublication,getByDeptPublication,getByIdPublication};