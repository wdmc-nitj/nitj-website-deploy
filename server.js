const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
var path = require("path");
const handlebars = require("express-handlebars");
var hb = require("express-handlebars").create();
const authenticate = require("./middleware/authenticate");

// All routes
const announcementsRouter = require("./routes/announcements");
const noticesRouter = require("./routes/notices");
const faqsRouter = require("./routes/faqs");
const peopleRouter = require("./routes/people");
const processesRouter = require("./routes/processes");
const policiesRouter = require("./routes/policies");
const usersRouter = require("./routes/users");
const placement_insightsRouter = require("./routes/placement_insights");
const placement_insightsRouter_img = require("./routes/placement_insights_img")
const nitj_messages = require("./routes/nitj_messages");
const internship_insightsRouter = require("./routes/internship_insights");
const placement_statsRouter = require("./routes/placement_stats");
const download = require("./routes/download");

require("dotenv").config();
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

// mongo db connections
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Setting Handlebars for frontend
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    defaultLayout: false,
  })
);

const partialsPath = path.join(__dirname, "views/partials");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views/"));
app.use(express.static(path.join(__dirname, "views/")));
app.use(express.static("views/img"));
app.use(express.static("public"));
// hbs.registerPartials(partialsPath)

Handlebars.registerHelper("ifNotEquals", function (arg1, arg2, options) {
  return arg1 != arg2 ? options.fn(this) : options.inverse(this);
});

// Routes
app.use("/Announcements", announcementsRouter);
app.use("/Notices", noticesRouter);
app.use("/FAQs", faqsRouter);
app.use("/People", peopleRouter);
app.use("/Processes", processesRouter);
app.use("/Policies", policiesRouter);
app.use("/NitjMessage",nitj_messages)
app.use("/Users", usersRouter);
app.use("/Internship_Insights", internship_insightsRouter);
app.use("/Placement_Insights", placement_insightsRouter);
app.use("/Placement_Insights_Img", placement_insightsRouter_img);
app.use("/Placement_Stats", placement_statsRouter);
app.use("/Download", download);

app.get("/", (req, res) => {
  res.render("Main/index.hbs", { URL: process.env.URL });
});

app.get("/index_internship", (req, res) => {
  res.render("Internship/internships.hbs", { URL: process.env.URL });
});

app.get("/index_placements", (req, res) => {
  res.render("Placements/placements.hbs", { URL: process.env.URL });
});

app.get("/index_wrecruit", (req, res) => {
  res.render("why_recruit/recruit.hbs", { URL: process.env.URL });
});

app.get("/index_download", (req, res) => {
  res.render("Download/downloads.hbs", { URL: process.env.URL });
});

app.get("/index_people", (req, res) => {
  res.render("People/people.hbs", { URL: process.env.URL });
});

app.get("/index_student_faqs", (req, res) => {
  res.render("Student_FAQ/student_faqs.hbs", { URL: process.env.URL });
});

app.get("/auth", (req, res) => {
  res.render("auth/index.hbs", { URL: process.env.URL });
});

// app.use(authenticate);
app.get("/admin", (req, res) => {
  res.render("admin_panel/index.hbs", { URL: process.env.URL });
});

app.get("/admin/announcements", (req, res) => {
  res.render("admin_panel/announcements.hbs", { URL: process.env.URL });
});

app.get("/admin/faqs", (req, res) => {
  res.render("admin_panel/faqs.hbs", { URL: process.env.URL });
});

app.get("/admin/notices", (req, res) => {
  res.render("admin_panel/notices.hbs", { URL: process.env.URL });
});

app.get("/admin/people", (req, res) => {
  res.render("admin_panel/people.hbs", { URL: process.env.URL });
});

app.get("/admin/policies", (req, res) => {
  res.render("admin_panel/policies.hbs", { URL: process.env.URL });
});

app.get("/admin/processes", (req, res) => {
  res.render("admin_panel/processes.hbs", { URL: process.env.URL });
});

app.get("/admin/users", (req, res) => {
  res.render("admin_panel/users.hbs", { URL: process.env.URL });
});

app.get("/admin/placement_insights", (req, res) => {
  res.render("admin_panel/placement_insights.hbs", { URL: process.env.URL });
});

app.get("/admin/placement_insights_img", (req, res) => {
  res.render("admin_panel/placement_insights_img.hbs", { URL: process.env.URL });
});

app.get("/admin/internship_insights", (req, res) => {
  res.render("admin_panel/internship_insights.hbs", { URL: process.env.URL });
});

app.get("/admin/placement_stats", (req, res) => {
  res.render("admin_panel/placement_stats.hbs", { URL: process.env.URL });
});

app.get("/admin/nitjMessage", (req, res) => {
  res.render("admin_panel/nitjMessage.hbs", { URL: process.env.URL });
});

app.get("/admin/download",(req, res) =>{
  res.render("admin_panel/download.hbs", { URL: process.env.URL });
})

app.get("/admin/PRDetails", (req, res) => {
  res.render("admin_panel/PRDetails.hbs", { URL: process.env.URL });
});

app.get("/logout", (req, res) => {
  res.clearCookie("jwtoken");
  res.status(200).send("Admin Logout");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
