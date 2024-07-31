
const InternationalStudent = require("../../models/internationalStudents/studentData.js");

//To add new entries or delete or update to internationaStudent use this path -: /api/studentData/student

exports.addInternationalStudent = async (req, res) => {
    try {
       
        const newInternationalStudent = new InternationalStudent(req.body);
        
        const savedInternationalStudent = await newInternationalStudent.save();
        
        res.status(201).json(savedInternationalStudent);
    } catch (error) {
       
        res.status(500).json({ message: error.message });
    }
};


exports.updateInternationalStudent = async (req, res) => {
    try {
        
        const updatedInternationalStudent = await InternationalStudent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        res.status(200).json(updatedInternationalStudent);
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};


exports.deleteInternationalStudent = async (req, res) => {
    try {
        
        await InternationalStudent.findByIdAndDelete(req.params.id);
        
        res.status(204).send();
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};


exports.getInternationalStudentById = async (req, res) => {
    try {
        
        const internationalStudent = await InternationalStudent.findById(req.params.id);
        
        if (!internationalStudent) {
            return res.status(404).json({ message: "International student not found" });
        }
        
        res.status(200).json(internationalStudent);
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};


exports.getAllInternationalStudents = async (req, res) => {
    try {
       
        const internationalStudents = await InternationalStudent.find();
        
        res.status(200).json(internationalStudents);
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};

module.exports=exports;

// module.exports = {
//     addInternationalStudent,
//     updateInternationalStudent,
//     deleteInternationalStudent,
//     getAllInternationalStudents,
//     getInternationalStudentById

// }