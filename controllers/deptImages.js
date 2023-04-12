const Images = require("../models/deptImages");

const getAllDeptImages = async (req, res) => {
    try {
        const result = await Images.find({ show: true },).sort({order:1});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdDeptImages = async (req, res) => {
    try {
        const result = await Images.find({ _id: req.params.id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptDeptImages = async (req, res) => {
    try {
        const result = await Images.findOne({ show: true, department: req.params.dept });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports = {getAllDeptImages,getByDeptDeptImages,getByIdDeptImages};