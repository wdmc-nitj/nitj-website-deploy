const Syllabus = require("../models/deptSyllabus");

const getAllSyllabus = async (req, res) => {
    try {
        const result = await Syllabus.find({ show: true, department: req.params.dept  });
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json("Error: " + error);
    }
}

module.exports = {getAllSyllabus}