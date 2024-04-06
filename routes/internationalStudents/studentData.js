const express = require("express");
const internationalStudentsController = require("../../controllers/internationalStudents/studentData.js");

const router = express.Router();

// Route to add a new international student
router.post("/student", internationalStudentsController.addInternationalStudent);

// Route to update an existing international student
router.patch("/student/:id", internationalStudentsController.updateInternationalStudent);

// Route to delete an international student
router.delete("/student/:id", internationalStudentsController.deleteInternationalStudent);

// Route to get details of a specific international student
router.get("/student/:id", internationalStudentsController.getInternationalStudentById);

// Route to get all international students
router.get("/student", internationalStudentsController.getAllInternationalStudents);

module.exports = router;
