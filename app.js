const express = require("express");
const cors = require("cors");
const compression = require("compression");


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
const academicnoticesRouter = require("./routes/academicnotices");
const studyProgramRouter = require("./routes/studyprog");
const examinationRouter = require("./routes/examination");
const clubRouter = require("./routes/club");
const upcomingEventRouter = require("./routes/upcomingEvent");
const departmentRouter = require("./routes/departement");
const searchRouter = require("./routes/search");
const newpageRouter = require("./routes/newpage");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const hostelRouter = require("./routes/hostel");
const proctorialCellRouter = require("./routes/proctorialCell");
const { admin_panel, router } = require("./admin_panel");
const upload = require("./routes/upload");
const store = require('./routes/store');
const admissionsRoutes = require('./routes/admissionsRoutes');
const researchRoutes = require('./routes/researchRoutes');
const recruitmentsRoutes = require('./routes/recruitmentRoutes');
const curriculumRouter = require('./routes/curriculum');
const deptCalendarRouter = require('./routes/deptCalendar');

//initialize app
const app = express();

//admin panel
app.use(admin_panel.options.rootPath, router);
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "5mb" }));
bodyParser.urlencoded({ extended: true });
app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
  res.sendFile("index.html");
});

//allowing all cross origin requests
app.use(
  cors({
    origin: "*",
  })
);

//routes

// app.use("/login",login);

// app.route('/*').post(verifyUser).put(verifyUser).delete(verifyUser);
app.use("/navbar", navBarRouter);
app.use("/news", newsRouter);
app.use("/initiative", initiativeRouter);
app.use("/latestEvent", latestEvents);
app.use("/administration", administrationRouter);
app.use("/notice", noticeRouter);
app.use("/ranking", rankingRouter);
app.use("/placementStat", placementStatRouter);
app.use("/instituteProspectusLink", instituteProspectusLinkRouter);
app.use("/yearlyRanking", yearlyRankingRouter);
app.use("/timeline", timelineRouter);
app.use("/publication", publicationRouter);
app.use("/academicnotices", academicnoticesRouter);
app.use("/specialCentres", specialCentresRouter);
app.use("/tender", tenderRouter);
app.use("/studyprogramme", studyProgramRouter);
app.use("/researchHighlights", reasearchHighlights);
app.use("/photoGallery", photoGalleryRouter);
app.use("/footer", footerRouter);
app.use("/about", aboutRouter);
app.use("/testimonial", testimonialRouter);
app.use("/studentTeam", studentTeamRouter);
app.use("/club", clubRouter);
app.use("/upcomingEvent", upcomingEventRouter);
app.use("/academicCalendar", academicCalendarRouter);

app.use("/deptCalendar", deptCalendarRouter);
app.use('/curriculum', curriculumRouter);
app.use('/examination', examinationRouter);
app.use("/search", searchRouter);
app.use("/dept", departmentRouter);
app.use('/newpage', newpageRouter)
app.use("/resource", resourceRouter);
app.use("/upload", upload);

app.use("/hostel", hostelRouter);
app.use("/proctorialCell", proctorialCellRouter);
app.use('/store', store);
app.use('/admissions', admissionsRoutes);
app.use('/research', researchRoutes);
app.use('/recruitments', recruitmentsRoutes);

app.get('/admin/ckeditor', (req, res) => {
  res.sendFile(__dirname + '/public/add.html');
})

app.get('/admin/upload', (req, res) => {
  res.sendFile(__dirname + '/public/upload.html');
})
app.get('/admin/store/add', (req, res) => {
  res.sendFile(__dirname + '/public/add.html');
})
app.get("/admin/store", (req, res) => {
  res.sendFile(__dirname + "/public/show.html");
});
// app.get('/admin/newpage/edit/:id',(req,res)=>{
//   res.sendFile(__dirname + '/public/edit.html');
// })


app.get("/admin/store/edit/:id", (req, res) => {
  res.sendFile(__dirname + "/public/edit.html");
});
app.get("/admin/navbar", (req, res) => {
  res.sendFile(__dirname + "/public/navbar.html");
});

app.get("/admin/navbar/add", (req, res) => {
  res.sendFile(__dirname + "/public/navbaradd.html");
});
//Export----------------------------->
module.exports = app;


