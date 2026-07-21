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
const eventsCalendarRouter = require("./routes/calendar/eventsCalendar")
const diiaRouter = require("./routes/diiaRoutes");

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

// --- Security: sanitize incoming write payloads to neutralize stored XSS ---
// Strips event-handler attributes (onerror/onload/...), dangerous tags, and
// javascript:/file:/vbscript:/data: URIs from all string values in the body.
// This protects every downstream innerHTML render sink across the site.
const DANGEROUS_TAG = /<\s*\/?\s*(script|iframe|object|embed|svg|link|meta|base|form)\b[^>]*>/gi;
const EVENT_HANDLER_ATTR = /\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const DANGEROUS_SCHEME = /(href|src|xlink:href|action|formaction)\s*=\s*("|'|)\s*(javascript|vbscript|file|data)\s*:/gi;

function sanitizeString(str) {
  return str
    .replace(DANGEROUS_TAG, "")
    .replace(EVENT_HANDLER_ATTR, "")
    .replace(DANGEROUS_SCHEME, (match, attr, quote) => `${attr}=${quote}#`);
}

function sanitizeDeep(value) {
  if (typeof value === "string") return sanitizeString(value);
  if (Array.isArray(value)) return value.map(sanitizeDeep);
  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) value[key] = sanitizeDeep(value[key]);
    return value;
  }
  return value;
}

// The shared secret the trusted admin pages send in the "authorization" header.
// Sourced from .env (SECRET_KEY) — no hardcoded fallback, so the value that was
// committed to the repo ("HareKrishna") no longer works. If SECRET_KEY is unset
// the guard fails closed and rejects every write.
// NOTE: this secret still appears in the public/*.html admin pages, so it is a
// deterrent, not real access control. Move to session-based auth to remove it
// from client code entirely. The sanitizer below holds even if it leaks.
const WRITE_SECRET = process.env.SECRET_KEY;

mainRouter.use((req, res, next) => {
  // Reads are public.
  if (req.method === "GET" || req.method === "HEAD" || req.method === "OPTIONS") {
    return next();
  }

  // Fail closed if the secret was never configured.
  if (!WRITE_SECRET) {
    console.error("SECRET_KEY is not set — rejecting all write requests.");
    return res.status(503).json({ message: "Server not configured for writes." });
  }

  // Gate all state-changing requests behind the admin shared secret.
  // (Department resources kept their historical exception; the sanitizer below
  // still runs for them.)
  const authorized =
    req.headers.authorization === WRITE_SECRET ||
    req.originalUrl.startsWith("/api/dept/");

  if (!authorized) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Defense-in-depth: strip XSS payloads from the write body before it reaches
  // any controller / the database.
  if (req.body) req.body = sanitizeDeep(req.body);

  return next();
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

mainRouter.use("/diia",diiaRouter);

mainRouter.use("/eventsCalendar",eventsCalendarRouter)

mainRouter.get(`/${adminPath}/ckeditor`, (req, res) => {
  res.sendFile(__dirname + "/public/add.html");
});

mainRouter.get(`/${adminPath}/upload`, (req, res) => {
  res.sendFile(__dirname + "/public/upload.html");
});
mainRouter.get(`/${adminPath}/delete`, (req, res) => {
  res.sendFile(__dirname + "/public/delete.html");
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
