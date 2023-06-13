const express = require("express");
const authController = require("../controllers/authController");
const resetController = require('../controllers/resetPassword');
const latestNewsController = require("../controllers/deptNews");
const programmeInfoController = require("../controllers/deptProgrammeInfo");
const DeptCalendar = require('../controllers/deptCalendar');

const {
  getByDeptAchievement,
  addAchievement,
  updateAchievement,
  deleteAchievement,
} = require("../controllers/achievement");
const {
  getByDeptActivity,
  addActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activity");
const {
  getByIdAlumni,
  addAlumni,
  updateAlumni,
  deleteAlumni,
  getByDeptAlumni,
} = require("../controllers/alumni");
const {
  getByIdFaculty,
  addFaculty,
  updateFaculty,
  deleteFaculty,
  getByDeptFaculty,
} = require("../controllers/faculty");
const {
  getByDeptHOD,
  addHOD,
  updateHOD,
  deleteHOD,
} = require("../controllers/hodmessage");
const {
  getByIdInfrastructure,
  addInfrastructure,
  updateInfrastructure,
  deleteInfrastructure,
  getByDeptInfrastructure,
} = require("../controllers/infrastructure");
const {
  getByIdPhdScholar,
  addPhdScholar,
  updatePhdScholar,
  deletePhdScholar,
  getByDeptPhdScholar,
} = require("../controllers/phdScholar");
const {
  getAllPlacement,
  getByIdPlacement,
  addPlacement,
  updatePlacement,
  deletePlacement,
  getByDeptPlacement,
} = require("../controllers/placement");
const {
  getByIdStaff,
  addStaff,
  updateStaff,
  deleteStaff,
  getByDeptStaff,
} = require("../controllers/staff");
const {
  getByIdStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  getByDeptStudent,
} = require("../controllers/student");
const {
  getByDeptAwards,
  addAwards,
  updateAwards,
  deleteAwards,
} = require("../controllers/awardsAndHonors");
const { getAllTimeTable } = require("../controllers/deptTimeTable");
const { getAllSyllabus } = require("../controllers/deptSyllabus");
const { getByDeptConsultancy, getAllConsultancy } = require("../controllers/deptConsultancy");
const { getByDeptPublication } = require("../controllers/deptPublications");
const { getByDeptProject } = require("../controllers/deptProjects");
const { getByDeptClubs } = require("../controllers/deptClubs");
const { getByDeptCoordinator } = require("../controllers/deptCoordinator");
const { getByDeptDeptImages } = require("../controllers/deptImages");
const { getByDeptContactUs } = require("../controllers/deptContactUs");
const { getByDeptDescription } = require("../controllers/deptDescription");

const Router = express.Router();

Router.post(
  "/:dept/login",
  authController.createSession
);
Router.get("/:dept/logout/:token",authController.deleteSession);
// Router.get('/:dept/Faculty/:id', authController.checkAuthentication)

Router.get("/:dept/Acadcord", getByDeptCoordinator);


Router.get("/:dept/Faculty", getByDeptFaculty);
Router.put("/:dept/Faculty/:id/:token", authController.signInAuthentication,updateFaculty);
Router.get("/:dept/Faculty/:id/:token",authController.signInAuthentication,getByIdFaculty);
Router.get("/:dept/Faculty/:id",getByIdFaculty);
// Router.post("/:dept/Faculty", addFaculty);
// Router.delete("/:dept/Faculty/:id", deleteFaculty);

Router.get("/:dept/Placement", getByDeptPlacement);
// Router.post("/:dept/Placement", addPlacement);
// Router.put("/:dept/Placement/:id", updatePlacement);
// Router.delete("/:dept/Placement/:id", deletePlacement);

Router.get("/:dept/programmeInfo",programmeInfoController.getByDeptprogrammeInfo);
// Router.post("/:dept/Placement", addPlacement);
// Router.put("/:dept/Placement/:id", updatePlacement);
// Router.delete("/:dept/Placement/:id", deletePlacement);

Router.get("/:dept/Infrastructure", getByDeptInfrastructure);
// Router.post("/:dept/Infrastructure", addInfrastructure);
// Router.put("/:dept/Infrastructure/:id", updateInfrastructure);
// Router.delete("/:dept/Infrastructure/:id", deleteInfrastructure);

Router.get("/:dept/Alumni", getByDeptAlumni);
// Router.post("/:dept/Alumni", addAlumni);
// Router.put("/:dept/Alumni/:id", updateAlumni);
// Router.delete("/:dept/Alumni/:id", deleteAlumni);

Router.get("/:dept/PhdScholar", getByDeptPhdScholar);
Router.get("/:dept/PhdScholar/:id",getByIdPhdScholar);
// Router.post("/:dept/PhdScholar", addPhdScholar);
// Router.put("/:dept/PhdScholar/:id", updatePhdScholar);
// Router.delete("/:dept/PhdScholar/:id", deletePhdScholar);

Router.get("/:dept/Staff", getByDeptStaff);
// Router.post("/:dept/Staff", addStaff);
// Router.put("/:dept/Staff/:id", updateStaff);
// Router.delete("/:dept/Staff/:id", deleteStaff);

Router.get("/:dept/Student", getByDeptStudent);
// Router.post("/:dept/Student", addStudent);
// Router.put("/:dept/Student/:id", updateStudent);
// Router.delete("/:dept/Student/:id", deleteStudent);

Router.get("/:dept/Activity", getByDeptActivity);
// Router.post("/:dept/Activity", addActivity);
// Router.put("/:dept/Activity/:id", updateActivity);
// Router.delete("/:dept/Activity/:id", deleteActivity);

Router.get("/:dept/Achievement", getByDeptAchievement);
// Router.post("/:dept/Achievement", addAchievement);
// Router.put("/:dept/Achievement/:id", updateAchievement);
// Router.delete("/:dept/Achievement/:id", deleteAchievement);

Router.get("/:dept/messageofHOD", getByDeptHOD);
// Router.post("/:dept/messageofHOD", addHOD);
// Router.put("/:dept/messageofHOD/:id", updateHOD);
// Router.delete("/:dept/messageofHOD/:id", deleteHOD);

Router.get("/:dept/awardsAndHonors", getByDeptAwards);
// Router.post("/:dept/awardsAndHonors", addAwards);
// Router.put("/:dept/awardsAndHonors/:id", updateAwards);
// Router.delete("/:dept/awardsAndHonors/:id", deleteAwards);

Router.post("/:dept/confirmation", resetController.resetEmailHandler);
Router.get("/:dept/confirmation/:token", resetController.checkToken);
Router.post("/:dept/confirmation/submit/:token", resetController.modifyPassword);
Router.get("/:dept/deptCalendar", DeptCalendar.getAllDeptCalendar);

Router.get("/:dept/TimeTable",getAllTimeTable);
Router.get("/:dept/Syllabus",getAllSyllabus);

Router.get("/:dept/Consultancy",getByDeptConsultancy);
Router.get("/:dept/Publications",getByDeptPublication);
Router.get("/:dept/Projects",getByDeptProject);
Router.get("/:dept/SocietyClubs",getByDeptClubs);
Router.get("/:dept/Images",getByDeptDeptImages);
Router.get("/:dept/contactus",getByDeptContactUs);
Router.get("/:dept/description",getByDeptDescription);
Router.route("/:dept/news").get(latestNewsController.getNews);
Router.route("/:dept/all").get(latestNewsController.getAllNews);

module.exports = Router;