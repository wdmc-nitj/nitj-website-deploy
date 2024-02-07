const express = require("express");

const mainRouter = express.Router();

const navBarRouter = require("./routes/navbar");
const newsRouter = require("./routes/news");
const initiativeRouter = require("./routes/initiative");

const latestEvents = require("./routes/latestEvent");
const administrationRouter = require("./routes/administration");
const resourceRouter = require("./routes/resource");
const noticeRouter = require("./routes/notice");
const rankingRouter = require("./routes/ranking");
const placementStatRouter = require("./routes/placementStat");
const instituteProspectusLinkRouter = require("./routes/instituteProspectusLink");
const yearlyRankingRouter = require("./routes/yearlyRanking");
const timelineRouter = require("./routes/timeline");
const publicationRouter = require("./routes/publication");
const academicCalendarRouter = require("./routes/academicCalendar");
const tenderRouter = require("./routes/tender");
const reasearchHighlights = require("./routes/researchHighlights");
const photoGalleryRouter = require("./routes/photoGallery");
const footerRouter = require("./routes/footer");
const aboutRouter = require("./routes/about");
const testimonialRouter = require("./routes/testimonial");
const specialCentresRouter = require("./routes/specialCentres");
const studentTeamRouter = require("./routes/studentTeam");
const scholarshipRouter = require("./routes/scholarship");
const academicnoticesRouter = require("./routes/academicnotices");
const studyProgramRouter = require("./routes/studyprog");
const clubRouter = require("./routes/club");
const clubPageRouter = require("./routes/clubsPage");
const upcomingEventRouter = require("./routes/upcomingEvent");
const departmentRouter = require("./routes/departement");
const searchRouter = require("./routes/search");
const newpageRouter = require("./routes/newpage");
const hostelRouter = require("./routes/hostel");
const proctorialCellRouter = require("./routes/proctorialCell");
const upload = require("./routes/upload");
const store = require("./routes/store");
const admissionsRoutes = require("./routes/admissionsRoutes");
const researchRoutes = require("./routes/researchRoutes");
const recruitmentsRoutes = require("./routes/recruitmentRoutes");
const curriculumRouter = require("./routes/curriculum");
const deptCalendarRouter = require("./routes/deptCalendar");
const examinationRouter = require("./routes/examination");
const eventsCalendarRouter = require("./routes/calendar/eventsCalendarRouter")

const eventsCalendarRouter = require("./routes/calendar/eventsCalendar")

const adminPath = "dashboard";

// The endpoint for the admin panel which used a non-GET request must be added to this array
const allowedNonGetRoutes = [
  "/api/store",
  "/api/store/*",
  "/api/navbar/delete",
  "/api/navbar/edit",
  "/api/navbar/sort",
  "/api/navbar/update",
  "/api/upload",
];

mainRouter.use("/*", (req, res, next) => {
  if (req.method === "GET") {
    next();
  } else {
    if (req.headers.authorization === process.env.SECRET_KEY || req.baseUrl.startsWith("/api/dept/")) {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  }
});

// mainRouter.route('/*').post(verifyUser).put(verifyUser).delete(verifyUser);
mainRouter.use("/navbar", navBarRouter);
mainRouter.use("/news", newsRouter);
mainRouter.use("/initiative", initiativeRouter);

mainRouter.use("/latestEvent", latestEvents);
mainRouter.use("/administration", administrationRouter);
mainRouter.use("/notice", noticeRouter);
mainRouter.use("/ranking", rankingRouter);
mainRouter.use("/placementStat", placementStatRouter);
mainRouter.use("/instituteProspectusLink", instituteProspectusLinkRouter);
mainRouter.use("/yearlyRanking", yearlyRankingRouter);
mainRouter.use("/timeline", timelineRouter);
mainRouter.use("/publication", publicationRouter);
mainRouter.use("/academicnotices", academicnoticesRouter);
mainRouter.use("/specialCentres", specialCentresRouter);
mainRouter.use("/tender", tenderRouter);
mainRouter.use("/studyprogramme", studyProgramRouter);
mainRouter.use("/researchHighlights", reasearchHighlights);
mainRouter.use("/photoGallery", photoGalleryRouter);
mainRouter.use("/footer", footerRouter);
mainRouter.use("/about", aboutRouter);
mainRouter.use("/testimonial", testimonialRouter);
mainRouter.use("/studentTeam", studentTeamRouter);
mainRouter.use("/scholarship", scholarshipRouter);
mainRouter.use("/club", clubRouter);
mainRouter.use("/clubsPage", clubPageRouter);
mainRouter.use("/upcomingEvent", upcomingEventRouter);
mainRouter.use("/academicCalendar", academicCalendarRouter);
mainRouter.use("/examination", examinationRouter);

mainRouter.use("/deptCalendar", deptCalendarRouter);
mainRouter.use("/curriculum", curriculumRouter);

mainRouter.use("/search", searchRouter);
mainRouter.use("/dept", departmentRouter);
mainRouter.use("/newpage", newpageRouter);
mainRouter.use("/resource", resourceRouter);
mainRouter.use("/upload", upload);

mainRouter.use("/hostel", hostelRouter);
mainRouter.use("/proctorialCell", proctorialCellRouter);
mainRouter.use("/store", store);
mainRouter.use("/admissions", admissionsRoutes);
mainRouter.use("/research", researchRoutes);
mainRouter.use("/recruitments", recruitmentsRoutes);

mainRouter.use("/eventsCalendar",eventsCalendarRouter)

mainRouter.get(`/${adminPath}/ckeditor`, (req, res) => {
  res.sendFile(__dirname + "/public/add.html");
});

mainRouter.get(`/${adminPath}/upload`, (req, res) => {
  res.sendFile(__dirname + "/public/upload.html");
});
mainRouter.get(`/${adminPath}/store/add`, (req, res) => {
  res.sendFile(__dirname + "/public/add.html");
});
mainRouter.get(`/${adminPath}/store`, (req, res) => {
  res.sendFile(__dirname + "/public/show.html");
});
// mainRouter.get('/${adminPath}/newpage/edit/:id',(req,res)=>{
//   res.sendFile(__dirname + '/public/edit.html');
// })

mainRouter.get(`/${adminPath}/store/edit/:id`, (req, res) => {
  res.sendFile(__dirname + "/public/edit.html");
});
mainRouter.get(`/${adminPath}/navbar`, (req, res) => {
  res.sendFile(__dirname + "/public/navbar.html");
});
mainRouter.get(`/${adminPath}/navbar/add`, (req, res) => {
  res.sendFile(__dirname + "/public/navbaradd.html");
});

//Export----------------------------->
module.exports = mainRouter;
