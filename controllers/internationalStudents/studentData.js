// Import the internationalStudents model
const InternationalStudent = require("../../models/internationalStudents/studentData.js");

// Controller function to add a new international student
exports.addInternationalStudent = async (req, res) => {
    try {
        // Create a new international student instance based on request body
        const newInternationalStudent = new InternationalStudent(req.body);
        // Save the new international student to the database
        const savedInternationalStudent = await newInternationalStudent.save();
        // Respond with the saved international student data
        res.status(201).json(savedInternationalStudent);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update an existing international student
exports.updateInternationalStudent = async (req, res) => {
    try {
        // Find the international student by id and update it with request body data
        const updatedInternationalStudent = await InternationalStudent.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        // Respond with the updated international student data
        res.status(200).json(updatedInternationalStudent);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};

// Controller function to delete an international student
exports.deleteInternationalStudent = async (req, res) => {
    try {
        // Find the international student by id and delete it
        await InternationalStudent.findByIdAndDelete(req.params.id);
        // Respond with success message
        res.status(204).send();
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get details of a specific international student by id
exports.getInternationalStudentById = async (req, res) => {
    try {
        // Find the international student by id
        const internationalStudent = await InternationalStudent.findById(req.params.id);
        // If international student not found, respond with 404
        if (!internationalStudent) {
            return res.status(404).json({ message: "International student not found" });
        }
        // Respond with the international student data
        res.status(200).json(internationalStudent);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all international students
exports.getAllInternationalStudents = async (req, res) => {
    try {
        // Retrieve all international students from the database
        const internationalStudents = await InternationalStudent.find();
        // Respond with the array of international students
        res.status(200).json(internationalStudents);
    } catch (error) {
        // Handle errors
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