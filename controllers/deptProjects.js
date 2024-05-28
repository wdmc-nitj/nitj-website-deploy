const Projects = require("../models/deptProjects");

const getAllProject = async (req, res) => {
    try {
        const result = await Projects.find({ show: true },).sort({order:1});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdProject = async (req, res) => {
    try {
        const result = await Projects.find({ _id: req.params.id });
        res.status(200).json({ data: result, validation: {status:req.user} });
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptProject = async (req, res) => {
    try {
        const result = await Projects.find({ show: true, department: req.params.dept }).sort({order:1});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports = {getAllProject,getByDeptProject,getByIdProject};