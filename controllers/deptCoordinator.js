const Coordinator = require("../models/deptCoordinators");

const getAllCoordinator = async (req, res) => {
    try {
        const result = await Coordinator.find({ show: true },).sort({order:1});
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdCoordinator = async (req, res) => {
    try {
        const result = await Coordinator.find({ _id: req.params.id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptCoordinator = async (req, res) => {
    try {
        const result = await Coordinator.find({ show: true, department: req.params.dept });
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports = {getAllCoordinator,getByDeptCoordinator,getByIdCoordinator};