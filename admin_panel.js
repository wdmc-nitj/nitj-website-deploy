const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
const AdminBroExpressjs = require("admin-bro-expressjs");

const bcrypt = require("bcrypt");

const Faculty = require("./models/Faculty");
const Acadcord = require("./models/Acadcord");
const Activity = require("./models/Activity");
const HOD = require("./models/HodMessage");
const Hostel = require("./models/hostel");
const Infrastructure = require("./models/Infrastructure");
const PhdScholar = require("./models/PhdScholar");
const Placement = require("./models/Placement");
const Staff = require("./models/Staff");
const DeptClub = require("./models/departmentClubs");
const DeptPub = require("./models/deptPublication");
const DeptCalender = require("./models/deptCalender");
const DeptConsultancy = require("./models/deptConsultancy");
const DeptCoordinators = require("./models/deptCoordinators");
const DeptNews = require("./models/deptNews");
const DeptProjects = require("./models/deptProjects");
const DeptSyllabus = require("./models/deptSyllabus");
const DeptTimeTable = require("./models/deptTimeTable");
const DeptStudents = require("./models/deptStudents");
const DeptContactUs = require("./models/deptContactUs");
const DeptImages = require("./models/deptImages");
const DeptProgrammeInfo = require("./models/deptProgrammeInfo");
const DeptDescription = require("./models/deptDescription");

const Navbar = require("./models/navbar");
const Footer = require("./models/footer");
const Clubs = require("./models/club");
// clubs page model define all the clubs data , whereas clubs is the model for home page club section
const ClubsPage = require("./models/clubsPage");
const News = require("./models/news");
const About = require("./models/about");
const AcademicCalendar = require("./models/academicCalendar");
const AcademicNotices = require("./models/academicnotices");
const Achievements = require("./models/Achievement");
const Administration = require("./models/administration");
const Alumni = require("./models/Alumni");
const Awards = require("./models/awardsAndHonors");
const InstituteProspectus = require("./models/instituteProspectusLink");
const LatestEvent = require("./models/latestEvent");
const NewPage = require("./models/newpage");
const Notice = require("./models/notice");
const Patent = require("./models/Patent");
const PhotoGallery = require("./models/photoGallery");
const PlacementStat = require("./models/placementStat");
const ProctorialCell = require("./models/proctorialCell");
const Publication = require("./models/publication");
const Ranking = require("./models/ranking");
const researchHighlights = require("./models/researchHighlights");
const Resource = require("./models/resource");
const StudentTeam = require("./models/studentTeam");
const Tender = require("./models/tender");
const Testimonial = require("./models/testimonial");
const Timeline = require("./models/timeline");
const upcommingEvent = require("./models/upcomingEvent");
const yearlyRanking = require("./models/yearlyRanking");
const scholarship = require("./models/scholarship");
const initiative = require("./models/initiatives");


//diia
const DiiaRankings = require("./models/diia/DiiaRankings");
const DiiaHeroSlider = require("./models/diia/DiiaHeroSlider");
const DiiaNewsSection = require("./models/diia/DiiaNewsSection");
const DiiaTestimonials = require("./models/diia/DiiaTestimonials");
const DiiaMous = require("./models/diia/DiiaMous");
const DiiaOpportunities= require("./models/diia/DiiaOpportunities");
const DiiaMap= require("./models/diia/DiiaMap");


// Research Menu
const researchMenuName = "Research";
const Consultancy = require("./models/research/consultancy");
// const Events = require("./models/research/events");
const MoUs = require("./models/research/MoUs");
const researchPublications = require("./models/research/researchPublications");
const sponsoredProjects = require("./models/research/sponsoredProjects");
const IPRs = require("./models/research/IPRs");

const RecruitmentUpdates =
  require("./models/recruitmentUpdates").RecruitmentUpdate;
const DefaultJobsTab = require("./models/recruitmentUpdates").DefaultJobsTab;
const addmissionHelpline = require("./models/admissions/admissionHelpline");
const addmissionUpdate = require("./models/admissions/admissionUpdate");
const importantLink = require("./models/admissions/importantLink");
const majorProgramme = require("./models/admissions/majorProgramme.js");
const minorProgramme = require("./models/admissions/minorProgramme.js");
const newpage = require("./models/newpage");

// adminbro model : model for super admin and department credentaials
const User = require("./models/AdminBroUser");
// model for clubadmin credentials
const ClubsBroUser = require("./models/clubsBroUser.js");

const { query } = require("express");
const { filter } = require("compression");
const specialCentres = require("./models/specialCentres");
const curriculum = require("./models/curriculum");
const examSchedule = require("./models/examSchedule");
const deptwiseFaculty = require("./models/deptwiseFaculty");

// Events Calendar 
const eventsCalendar = require("./models/calendar/eventsCalendar.js")

// defined new role : clubadmin , can access their respective club
const canModifyUsers = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";
const isAdmin = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";
const isClubAdmin = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "clubadmin";

  // removal of feilds that should not be changed by the admin panel / non required fields
function removefields(arr) {
  var index = arr.indexOf("department");
  if (index > -1) {
    arr.splice(index, 1);
  }
  // var index = arr.indexOf("__v");
  // if (index > -1) {
  //   arr.splice(index, 1);
  // }
  var index = arr.indexOf("_id");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("sourceOfInfo");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("name");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("type");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("show");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("new");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("updateLogs");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("order");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("sourceOfInfoName");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("sourceOfInfoEmail");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("sourceOfInfoDesignation");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("sourceOfInfoDepartment");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("createdAt");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("updatedAt");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("newPage");
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
  // removal of feilds that should not be changed by the admin panel / non required fields

const removefieldsAdmin = (arr) => {
  var index = arr.indexOf("role");
  if (index > -1) {
    arr.splice(index, 1);
  }
  // var index = arr.indexOf("__v");
  // if (index > -1) {
  //   arr.splice(index, 1);
  // }
  var index = arr.indexOf("_id");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("sourceOfInfo");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("password");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("createdAt");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("updatedAt");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("newPage");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("order");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("sourceOfInfoName");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("sourceOfInfoEmail");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("sourceOfInfoDesignation");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("sourceOfInfoDepartment");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("show");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("new");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("updateLogs");
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};
const canEditDept = ({ currentAdmin, record }) => {
  if (currentAdmin.role === "admin") {
    return true;
  }

  if (!currentAdmin.role) {
    return false;
  }

  if (!record) {
    return true;
  }

  if (record) {
    return currentAdmin.department === record.param("department");
  }
};

const canEditClub = ({ currentAdmin, record }) => {
  // check for admin full access
  if (currentAdmin.role === "admin") {
    return true;
  }
  // if doesnt have any role , dont give access
  if (!currentAdmin.role) {
    return false;
  }
  // added check that department should not access the club data
  if (currentAdmin.role === "restricted") {
    return false
  }
  if (!record) {
    return true;
  }
  // if record is present then check for the department(club) of the clubadmin and show only that clubdata
  if (record && currentAdmin.role == "clubadmin") {
    return currentAdmin.department == record.param("name");
  }
};

const canEditprofile = ({ currentAdmin, record }) => {
  if (currentAdmin.role === "admin") {
    return true;
  }
  if (currentAdmin.role) {
    return false;
  }
  if (!record) {
    return true;
  }
  if (record) {
    return currentAdmin._id === record.param("_id");
  }
};

// excluding clubadmin from accessing the department data : updated each deptmt model config with this logic 
const notAccessibleByClubs = ({ currentAdmin, record }) => {
  return !isClubAdmin({ currentAdmin }) && canEditDept({ currentAdmin, record })
}
AdminBro.registerAdapter(AdminBroMongoose);
const AdminBroOptions = {
  branding: {
    companyName: "Nit Jalandhar Admin Panel",
    softwareBrothers: false,
    logo: "https://th.bing.com/th/id/OIP.33xhS0Ai3c5yQkxwtYXTQgAAAA?pid=ImgDet&rs=1",
    favicon:
      "https://th.bing.com/th/id/OIP.33xhS0Ai3c5yQkxwtYXTQgAAAA?pid=ImgDet&rs=1",
  },
  dashboard: {
    component: AdminBro.bundle('./my-dashboard'),
  },
  rootPath: "/api/dashboard",
  loginPath: "/api/dashboard/login",
  logoutPath: "/api/dashboard/logout",
  timezone: 'Asia/Kolkata',
  resources: [
    ////// Assessable By Department HOD /////
    {
      resource: DeptImages,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptImages.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
                
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptImages.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptImages.schema.paths)
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptImages.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptImages.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          },
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptDescription,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptDescription.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptDescription.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptDescription.schema.paths)
            }, 
            after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptDescription.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptDescription.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: Activity,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(Activity.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(Activity.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(Activity.schema.paths)
            }, 
            after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                Activity.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                Activity.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptNews,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptNews.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptNews.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptNews.schema.paths)
            }, 
            after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptNews.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptNews.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: Placement,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(Placement.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(Placement.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(Placement.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                Placement.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                Placement.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: eventsCalendar,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(eventsCalendar.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(eventsCalendar.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(eventsCalendar.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                eventsCalendar.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                eventsCalendar.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                     console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },  
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: HOD,
      options: {
        navigation: "About",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(HOD.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            new: {
              layout: (currentAdmin) => {
                return Object.keys(HOD.schema.paths)
              }, 
              after: async (request, context) => {
                const adminUser = context.session.adminUser
                query_fetched = { ...request.query }
                if (adminUser && adminUser.role === 'restricted') {
                  HOD.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Result :", result)
                    }
                  })
                }
                if (adminUser) {
                  HOD.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Result :", result)
                    }
                  })
                }
                return {
                  ...request,
                  query: query_fetched
                }
              },
              isAccessible: canEditDept
            }
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(HOD.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: { isAccessible: canEditDept },
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: Achievements,
      options: {
        navigation: "About",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(Achievements.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(Achievements.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(Achievements.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                Achievements.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                Achievements.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: Infrastructure,
      options: {
        navigation: "About",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(Infrastructure.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(Infrastructure.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(Infrastructure.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                Infrastructure.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                Infrastructure.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptContactUs,
      options: {
        navigation: "About",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptContactUs.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptContactUs.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptContactUs.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptContactUs.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptContactUs.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          },
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptProgrammeInfo,
      options: {
        navigation: "Academic",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptProgrammeInfo.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptProgrammeInfo.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptProgrammeInfo.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptProgrammeInfo.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptProgrammeInfo.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptCoordinators,
      options: {
        navigation: "Academic",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptCoordinators.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptCoordinators.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptCoordinators.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptCoordinators.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptCoordinators.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptSyllabus,
      options: {
        navigation: "Academic",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptSyllabus.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptSyllabus.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptSyllabus.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptSyllabus.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptSyllabus.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptTimeTable,
      options: {
        navigation: "Academic",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptTimeTable.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptTimeTable.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptTimeTable.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptTimeTable.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptTimeTable.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptCalender,
      options: {
        navigation: "Academic",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptCalender.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptCalender.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptCalender.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptCalender.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptCalender.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: PhdScholar,
      options: {
        navigation: "People",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(PhdScholar.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(PhdScholar.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(PhdScholar.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                PhdScholar.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                PhdScholar.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptStudents,
      options: {
        navigation: "People",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptStudents.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptStudents.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptStudents.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptStudents.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptStudents.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: Staff,
      options: {
        navigation: "People",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(Staff.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(Staff.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(Staff.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                Staff.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                Staff.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptPub,
      options: {
        navigation: "Research And Labs",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptPub.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptPub.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptPub.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptPub.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptPub.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptProjects,
      options: {
        navigation: "Research And Labs",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptProjects.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptProjects.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptProjects.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptProjects.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptProjects.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptConsultancy,
      options: {
        navigation: "Research And Labs",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptConsultancy.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptConsultancy.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptConsultancy.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptConsultancy.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptConsultancy.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },
    {
      resource: DeptClub,
      options: {
        navigation: "Research And Labs",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              return Object.keys(DeptClub.schema.paths);
            },
            after: async (request, context) => {
              const adminUser = context.session.adminUser;
              query_fetched = { ...request.query };
              if (adminUser && adminUser.role === "restricted") {
                request.record.params.department = adminUser.department;
              }
              if (adminUser) {
                request.record.params.sourceOfInfo = adminUser.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role === "restricted") {
                // to filter by department
                query_fetched["filters.department"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: notAccessibleByClubs,
          },
          show: {
            layout: (currentAdmin) => {
              return Object.keys(DeptClub.schema.paths);
            },
            isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: (currentAdmin) => {
              return Object.keys(DeptClub.schema.paths)
            }, after: async (request, context) => {
              const adminUser = context.session.adminUser
              query_fetched = { ...request.query }
              if (adminUser && adminUser.role === 'restricted') {
                DeptClub.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              if (adminUser) {
                DeptClub.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                  if (err) {
                    console.log(err)
                  } else {
                    console.log("Result :", result)
                  }
                })
              }
              return {
                ...request,
                query: query_fetched
              }
            },
            isAccessible: canEditDept
          }
        },
        properties: {
          sourceOfInfo: { isVisible: false },
        },
      },
    },

    /////////////////////////////////////////////

    ////// Assessable By Super Admin Only /////

    // Research Models
    {
      resource: Consultancy,
      options: {
        navigation: researchMenuName,
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    // {
    //   resource: Events,
    //   options: {
    //     navigation: researchMenuName,
    //     actions: { list: { isAccessible: isAdmin } },
    //   },
    // },
    {
      resource: MoUs,
      options: {
        navigation: researchMenuName,
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: researchPublications.CitedResearch,
      options: {
        navigation: researchMenuName,
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: researchPublications.RefereedResearch,
      options: {
        navigation: researchMenuName,
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: sponsoredProjects,
      options: {
        navigation: researchMenuName,
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: IPRs,
      options: {
        navigation: researchMenuName,
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: specialCentres,
      options: {
        navigation: researchMenuName,
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    // {
    //   resource: eventsCalendar,
    //   options: {
    //     navigation: "Home",
    //     actions: { list: { isAccessible: isAdmin } },
    //   },
    // },
    {
      resource: DefaultJobsTab,
      options: {
        navigation: "Jobs",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: RecruitmentUpdates,
      options: {
        navigation: "Jobs",
        actions: { list: { isAccessible: isAdmin } },
      },
    },

    {
      resource: Hostel,
      options: {
        navigation: "Hostel",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Navbar,
      options: {
        navigation: "Website",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Footer,
      options: {
        navigation: "Website",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    // clubs page config , all clubs accessible by admin , and clubadmin can only access their club
    {
      resource: ClubsPage,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "clubadmin") {
                return removefields(Object.keys(ClubsPage.schema.paths));
              }
              return removefieldsAdmin(Object.keys(ClubsPage.schema.paths));
            },
            isAccessible: (canEditClub || isAdmin)
          },
          list: {
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              // to filter by clubName to show only their club
              if (currentAdmin && currentAdmin.role === "clubadmin") {
                query_fetched["filters.name"] = currentAdmin.department;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            // only club admin can access their club and super admin can access all clubs
            isAccessible: (canEditClub || isAdmin)
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "clubadmin") {
                return removefields(Object.keys(ClubsPage.schema.paths));
              }
              return removefieldsAdmin(Object.keys(ClubsPage.schema.paths));
            },
            isAccessible: (canEditClub || isAdmin)
          },
          // only super admin can delete club
          delete: { isAccessible: isAdmin },
          bulkDelete: { isAccessible: isAdmin },
          new: {
            layout: () => {
              return removefieldsAdmin(Object.keys(ClubsPage.schema.paths));
            },
            // only super admin can create new club
            isAccessible: (isAdmin)
          }
        },
      },
    },
    {
      resource: Clubs,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: About,
      options: {
        navigation: "About",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Faculty,
      options: {
        navigation: "Faculty",
        actions: {
          list: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "admin") {
                return [
                  "_id",
                  "name",
                  "email",
                  "password",
                  "img",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
                  "nationality",
                  "guest",
                  "book_publications",
                  "conference_publications",
                  "admin_responsibility",
                  "patent",
                  "phd_supervised",
                  "phd_dissertion",
                  "awards",
                  "research_profile",
                  "research_collaboration",
                  "research_project",
                  "personal_link",
                  "journal",
                  "event",
                  "show",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "education_qualification",
                "address",
                "gender",
                "dob",
                "designation",
                "nationality",
                "guest",
                "book_publications",
                "conference_publications",
                "admin_responsibility",
                "patent",
                "phd_supervised",
                "phd_dissertion",
                "awards",
                "research_profile",
                "research_project",
                "research_collaboration",
                "personal_link",
                "journal",
                "event",
                "show",
                "affiliations",
              ];
            },
            before: async (request, context) => {
              const { currentAdmin } = context;
              query_fetched = { ...request.query };
              if (currentAdmin && currentAdmin.role != "admin") {
                // to filter by department
                query_fetched["filters.email"] = currentAdmin.email;
              }
              return {
                ...request,
                query: query_fetched,
              };
            },
            isAccessible: canEditprofile,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "admin") {
                return [
                  "_id",
                  "name",
                  "email",
                  "password",
                  "img",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
                  "nationality",
                  "guest",
                  "book_publications",
                  "conference_publications",
                  "admin_responsibility",
                  "patent",
                  "phd_supervised",
                  "phd_dissertion",
                  "awards",
                  "research_profile",
                  "research_project",
                  "research_collaboration",
                  "personal_link",
                  "journal",
                  "event",
                  "show",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "address",
                "gender",
                "dob",
                "designation",
                "nationality",
                "education_qualification",
                "book_publications",
                "conference_publications",
                "admin_responsibility",
                "patent",
                "phd_supervised",
                "phd_dissertion",
                "awards",
                "research_profile",
                "research_project",
                "research_collaboration",
                "personal_link",
                "journal",
                "event",
                "affiliations",
              ];
            },
            isAccessible: canEditprofile,
          },
          delete: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "admin") {
                return [
                  "_id",
                  "name",
                  "email",
                  "password",
                  "img",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
                  "guest",
                  "nationality",
                  "book_publications",
                  "conference_publications",
                  "admin_responsibility",
                  "patent",
                  "phd_supervised",
                  "phd_dissertion",
                  "awards",
                  "research_profile",
                  "research_project",
                  "research_collaboration",
                  "personal_link",
                  "journal",
                  "event",
                  "show",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "address",
                "gender",
                "dob",
                "designation",
                "nationality",
                "education_qualification",
                "book_publications",
                "conference_publications",
                "admin_responsibility",
                "patent",
                "phd_supervised",
                "phd_dissertion",
                "awards",
                "research_profile",
                "research_project",
                "research_collaboration",
                "personal_link",
                "journal",
                "event",
                "affiliations",
              ];
            },
            isAccessible: isAdmin,
          },
          bulkDelete: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "admin") {
                return [
                  "_id",
                  "name",
                  "email",
                  "password",
                  "img",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
                  "nationality",
                  "guest",
                  "book_publications",
                  "conference_publications",
                  "admin_responsibility",
                  "patent",
                  "phd_supervised",
                  "phd_dissertion",
                  "awards",
                  "research_profile",
                  "research_project",
                  "research_collaboration",
                  "personal_link",
                  "journal",
                  "event",
                  "show",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "position",
                "address",
                "gender",
                "dob",
                "designation",
                "nationality",
                "education_qualification",
                "book_publications",
                "conference_publications",
                "admin_responsibility",
                "patent",
                "phd_supervised",
                "phd_dissertion",
                "awards",
                "research_profile",
                "research_project",
                "research_collaboration",
                "personal_link",
                "journal",
                "event",
                "affiliations",
              ];
            },
            isAccessible: isAdmin,
          },
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "admin") {
                return [
                  "_id",
                  "name",
                  "email",
                  "password",
                  "img",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
                  "nationality",
                  "guest",
                  "book_publications",
                  "conference_publications",
                  "admin_responsibility",
                  "patent",
                  "phd_supervised",
                  "phd_dissertion",
                  "awards",
                  "research_profile",
                  "research_project",
                  "research_collaboration",
                  "personal_link",
                  "journal",
                  "event",
                  "show",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "address",
                "gender",
                "dob",
                "designation",
                "nationality",
                "education_qualification",
                "book_publications",
                "conference_publications",
                "admin_responsibility",
                "patent",
                "phd_supervised",
                "phd_dissertion",
                "awards",
                "research_profile",
                "research_collaboration",
                "research_project",
                "personal_link",
                "journal",
                "event",
                "affiliations",
              ];
            },
            isAccessible: canEditprofile,
          },
          new: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "admin") {
                return [
                  "_id",
                  "name",
                  "email",
                  "password",
                  "img",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
                  "nationality",
                  "guest",
                  "book_publications",
                  "conference_publications",
                  "admin_responsibility",
                  "patent",
                  "phd_supervised",
                  "phd_dissertion",
                  "awards",
                  "research_profile",
                  "research_collaboration",
                  "research_project",
                  "personal_link",
                  "journal",
                  "event",
                  "show",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "address",
                "gender",
                "dob",
                "designation",
                "nationality",
                "education_qualification",
                "book_publications",
                "conference_publications",
                "admin_responsibility",
                "patent",
                "phd_supervised",
                "phd_dissertion",
                "awards",
                "research_profile",
                "research_collaboration",
                "research_project",
                "personal_link",
                "journal",
                "event",
                "affiliations",
              ];
            },
            isAccessible: isAdmin,
          },
        },
      },
    },
//diia
{
  resource: DiiaRankings,
  options: {
      navigation: "DIIA",
      actions: {
          edit: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaRankings.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                  if (adminUser && adminUser.role === "restricted") {
                      request.record.params.department = adminUser.department;
                  }
                  if (adminUser) {
                      request.record.params.sourceOfInfo = adminUser.email;
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
              before: async (request, context) => {
                  const { currentAdmin } = context;
                  query_fetched = { ...request.query };
                  /* if (currentAdmin && currentAdmin.role === "restricted") {
                      query_fetched["filters.department"] = currentAdmin.department;
                  } */
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: notAccessibleByClubs,
          },
          show: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaRankings.schema.paths);
              },
              isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaRankings.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                /*   if (adminUser && adminUser.role === "restricted") {
                      DiiaRankings.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  } */
                  if (adminUser) {
                      DiiaRankings.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          }
      },
      properties: {
          sourceOfInfo: { isVisible: false },
      },
  },
},
{
  resource: DiiaHeroSlider,
  options: {
      navigation: "DIIA",
      actions: {
          edit: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaHeroSlider.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                  if (adminUser && adminUser.role === "restricted") {
                      request.record.params.department = adminUser.department;
                  }
                  if (adminUser) {
                      request.record.params.sourceOfInfo = adminUser.email;
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
              before: async (request, context) => {
                  const { currentAdmin } = context;
                  query_fetched = { ...request.query };
                  /* if (currentAdmin && currentAdmin.role === "restricted") {
                      query_fetched["filters.department"] = currentAdmin.department;
                  } */
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: notAccessibleByClubs,
          },
          show: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaHeroSlider.schema.paths);
              },
              isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaHeroSlider.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                 /*  if (adminUser && adminUser.role === "restricted") {
                      DiiaHeroSlider.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  } */
                  if (adminUser) {
                      DiiaHeroSlider.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          }
      },
      properties: {
          sourceOfInfo: { isVisible: false },
      },
  },
},
{
  resource: DiiaNewsSection,
  options: {
      navigation: "DIIA",
      actions: {
          edit: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaNewsSection.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                  if (adminUser && adminUser.role === "restricted") {
                      request.record.params.department = adminUser.department;
                  }
                  if (adminUser) {
                      request.record.params.sourceOfInfo = adminUser.email;
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
              before: async (request, context) => {
                  const { currentAdmin } = context;
                  query_fetched = { ...request.query };
                 /*  if (currentAdmin && currentAdmin.role === "restricted") {
                      query_fetched["filters.department"] = currentAdmin.department;
                  } */
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: notAccessibleByClubs,
          },
          show: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaNewsSection.schema.paths);
              },
              isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaNewsSection.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                 /*  if (adminUser && adminUser.role === "restricted") {
                      DiiaNewsSection.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  } */
                  if (adminUser) {
                      DiiaNewsSection.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          }
      },
      properties: {
          sourceOfInfo: { isVisible: false },
      },
  },
},
{
  resource: DiiaOpportunities,
  options: {
      navigation: "DIIA",
      actions: {
          edit: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaOpportunities.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                  if (adminUser && adminUser.role === "restricted") {
                      request.record.params.department = adminUser.department;
                  }
                  if (adminUser) {
                      request.record.params.sourceOfInfo = adminUser.email;
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
              before: async (request, context) => {
                  const { currentAdmin } = context;
                  query_fetched = { ...request.query };
                 /*  if (currentAdmin && currentAdmin.role === "restricted") {
                      query_fetched["filters.department"] = currentAdmin.department;
                  } */
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: notAccessibleByClubs,
          },
          show: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaOpportunities.schema.paths);
              },
              isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaOpportunities.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                  /* if (adminUser && adminUser.role === "restricted") {
                      DiiaOpportunities.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  } */
                  if (adminUser) {
                      DiiaOpportunities.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          }
      },
      properties: {
          sourceOfInfo: { isVisible: false },
      },
  },
},
{
  resource: DiiaMap,
  options: {
      navigation: "DIIA",
      actions: {
          edit: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaMap.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                  if (adminUser && adminUser.role === "restricted") {
                      request.record.params.department = adminUser.department;
                  }
                  if (adminUser) {
                      request.record.params.sourceOfInfo = adminUser.email;
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
              before: async (request, context) => {
                  const { currentAdmin } = context;
                  query_fetched = { ...request.query };
                  if (currentAdmin && currentAdmin.role === "restricted") {
                      query_fetched["filters.Department"] = currentAdmin.department;
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: notAccessibleByClubs,
          },
          show: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaMap.schema.paths);
              },
              isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaMap.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                  if (adminUser && adminUser.role === "restricted") {
                      DiiaMap.update({ _id: request.record.params._id }, { Department: adminUser.department }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  }
                  if (adminUser) {
                      DiiaMap.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          }
      },
      properties: {
          sourceOfInfo: { isVisible: false },
      },
  },
},
{
  resource: DiiaTestimonials,
  options: {
      navigation: "DIIA",
      actions: {
          edit: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaTestimonials.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                  if (adminUser && adminUser.role === "restricted") {
                      request.record.params.department = adminUser.department;
                  }
                  if (adminUser) {
                      request.record.params.sourceOfInfo = adminUser.email;
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
              before: async (request, context) => {
                  const { currentAdmin } = context;
                  query_fetched = { ...request.query };
                  if (currentAdmin && currentAdmin.role === "restricted") {
                      query_fetched["filters.dept"] = currentAdmin.department;
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: notAccessibleByClubs,
          },
          show: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaTestimonials.schema.paths);
              },
              isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaTestimonials.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                  if (adminUser && adminUser.role === "restricted") {
                      DiiaTestimonials.update({ _id: request.record.params._id }, { dept: adminUser.department }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  }
                  if (adminUser) {
                      DiiaTestimonials.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          }
      },
      properties: {
          sourceOfInfo: { isVisible: false },
      },
  },
},
{
  resource: DiiaMous,
  options: {
      navigation: "DIIA",
      actions: {
          edit: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaMous.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                  if (adminUser && adminUser.role === "restricted") {
                      request.record.params.department = adminUser.department;
                  }
                  if (adminUser) {
                      request.record.params.sourceOfInfo = adminUser.email;
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          },
          delete: { isAccessible: isAdmin },
          list: {
              before: async (request, context) => {
                  const { currentAdmin } = context;
                  query_fetched = { ...request.query };
                /*   if (currentAdmin && currentAdmin.role === "restricted") {
                      query_fetched["filters.department"] = currentAdmin.department;
                  } */
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: notAccessibleByClubs,
          },
          show: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaMous.schema.paths);
              },
              isAccessible: canEditDept,
          },
          bulkDelete: { isAccessible: isAdmin },
          new: {
              layout: (currentAdmin) => {
                  return Object.keys(DiiaMous.schema.paths);
              },
              after: async (request, context) => {
                  const adminUser = context.session.adminUser;
                  query_fetched = { ...request.query };
                 /*  if (adminUser && adminUser.role === "restricted") {
                      DiiaMous.update({ _id: request.record.params._id }, { department: adminUser.department }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  } */
                  if (adminUser) {
                      DiiaMous.update({ _id: request.record.params._id }, { sourceOfInfo: adminUser.email }, function (err, result) {
                          if (err) {
                              console.log(err);
                          } else {
                              console.log("Result :", result);
                          }
                      });
                  }
                  return {
                      ...request,
                      query: query_fetched,
                  };
              },
              isAccessible: canEditDept,
          }
      },
      properties: {
          sourceOfInfo: { isVisible: false },
      },
  },
},



    {
      resource: AcademicCalendar,
      options: {
        navigation: "Academics",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: scholarship,
      options: {
        navigation: "Scholarship",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: initiative,
      options: {
        navigation: "Initiative",
        actions: { list: { isAccessible: isAdmin } },
      },
    },

    {
      resource: specialCentres,
      options: {
        navigation: "AcademicsSystem",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: curriculum,
      options: {
        navigation: "AcademicsSystem",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: examSchedule,
      options: {
        navigation: "AcademicsSystem",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: AcademicNotices,
      options: {
        navigation: "Academics",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Administration,
      options: {
        navigation: "Administration",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Alumni,
      options: {
        navigation: "Alumni",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Awards,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: InstituteProspectus,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: LatestEvent,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: News,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },

    {
      resource: Notice,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Patent,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: PhotoGallery,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: PlacementStat,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: ProctorialCell,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Ranking,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: researchHighlights,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Resource,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: StudentTeam,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: deptwiseFaculty,
      options: {
        navigation: "Faculty",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Tender,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Testimonial,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: Timeline,
      options: {
        navigation: "About",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: upcommingEvent,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: yearlyRanking,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },

    {
      resource: addmissionHelpline,
      options: {
        navigation: "Admissions",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: addmissionUpdate,
      options: {
        navigation: "Admissions",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: importantLink,
      options: {
        navigation: "Admissions",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: majorProgramme,
      options: {
        navigation: "Admissions",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: minorProgramme,
      options: {
        navigation: "Admissions",
        actions: { list: { isAccessible: isAdmin } },
      },
    },

    {
      resource: Publication,
      options: {
        navigation: "Home",
        actions: { list: { isAccessible: isAdmin } },
      },
    },
    {
      resource: newpage,
      options: {
        navigation: "New Page",
        actions: { list: { isAccessible: isAdmin } },
      },
    },

    {
      resource: User,
      options: {
        navigation: "AdminPanelUsers",
        actions: {
          list: { isAccessible: isAdmin },
          new: {
            before: async (request) => {
              if (request.payload.record.password) {
                request.payload.record = {
                  ...request.payload.record,
                  password: request.payload.record.password,
                };
              }
              return request;
            },
          },
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
        },
      },
    },
  ],
  locale: {
    translations: {
      labels: {
        deptImages: "Department Images",
        deptDescription: "Department Description",
        deptNews: "Department News",
        deptContactUs: "Department Contact Us",
        deptProgrammeInfo: "Department Programme Info",
        deptCoordinators: "Department Coordinators",
        deptSyllabus: "Department Syllabus",
        deptTimeTable: "Department Time Table",
        deptCalender: "Department Calender",
        deptStudents: "Department Students",
        deptPublication: "Department Publications",
        deptProjects: "Department Projects",
        deptConsultancy: "Department Consultancy",
      },
    },
  },
};

const admin_panel = new AdminBro(AdminBroOptions);
// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildAuthenticatedRouter(admin_panel, {
  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    const clubuser = await ClubsBroUser.findOne({ email });
    const faculty = await Faculty.findOne({ email });
    if (user) {
      const matched = password == user.password;
      if (matched) {
        return user;
      }
    }
    else if (clubuser) {
      const matched = password == clubuser.password;
      if (matched) {
        return clubuser;
      }
    }
    else if (faculty) {
      var status = false;
      await bcrypt.compare(password, faculty.password).then((value) => {
        if (value) {
          status = true;
        }
      });
      if (status) {
        return faculty;
      }
    }
    return false;
  },
  cookiePassword: "some-secret-password-used-to-secure-cookie",
});

module.exports = { admin_panel, router };