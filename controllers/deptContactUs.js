const ContactUs = require("../models/deptContactUs");

const getAllContactUs = async (req, res) => {
    try {
        const result = await ContactUs.find({ show: true },);
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByIdContactUs = async (req, res) => {
    try {
        const result = await ContactUs.find({ _id: req.params.id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

const getByDeptContactUs = async (req, res) => {
    try {
        const result = await ContactUs.findOne({ show: true, department: req.params.dept });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports = {getAllContactUs,getByDeptContactUs,getByIdContactUs};