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

// Research Menu
const researchMenuName = "Research";
const Consultancy = require("./models/research/consultancy");
const Events = require("./models/research/events");
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

const newpage = require("./models/newpage");

const User = require("./models/AdminBroUser");
const { query } = require("express");
const { filter } = require("compression");
const specialCentres = require("./models/specialCentres");

const canModifyUsers = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";
const isAdmin = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";
function removefields(arr) {
  var index = arr.indexOf("department");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("__v");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("_id");
  if (index > -1) {
    arr.splice(index, 1);
  }
  var index = arr.indexOf("sourceOfInfo");
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
const canEditDept = ({ currentAdmin, record }) => {
  // console.log(removefields(Object.keys(DeptDescription.schema.paths)))
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
    return currentAdmin.department == record.param("department");
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

AdminBro.registerAdapter(AdminBroMongoose);
const AdminBroOptions = {
  branding: {
    companyName: "Nit Jalandhar Admin Panel",
    softwareBrothers: false,
    logo: "https://th.bing.com/th/id/OIP.33xhS0Ai3c5yQkxwtYXTQgAAAA?pid=ImgDet&rs=1",
    favicon:
      "https://th.bing.com/th/id/OIP.33xhS0Ai3c5yQkxwtYXTQgAAAA?pid=ImgDet&rs=1",
  },
  rootPath: "/api/dashboard",
  loginPath: "/api/dashboard/login",
  logoutPath: "/api/dashboard/logout",
  resources: [
    ////// Assessable By Department HOD /////
    {
      resource: DeptImages,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptImages.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptImages.schema.paths));
              }
              return Object.keys(DeptImages.schema.paths);
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
      resource: DeptDescription,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptDescription.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptDescription.schema.paths));
              }
              return Object.keys(DeptDescription.schema.paths);
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
      resource: Activity,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(Activity.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(Activity.schema.paths));
              }
              return Object.keys(Activity.schema.paths);
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
      resource: DeptNews,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptNews.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptNews.schema.paths));
              }
              return Object.keys(DeptNews.schema.paths);
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
      resource: Placement,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(Placement.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(Placement.schema.paths));
              }
              return Object.keys(Placement.schema.paths);
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
      resource: HOD,
      options: {
        navigation: "About",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(HOD.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(HOD.schema.paths));
              }
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
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(Achievements.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(Achievements.schema.paths));
              }
              return Object.keys(Achievements.schema.paths);
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
      resource: Infrastructure,
      options: {
        navigation: "About",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(Infrastructure.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(Infrastructure.schema.paths));
              }
              return Object.keys(Infrastructure.schema.paths);
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
      resource: DeptContactUs,
      options: {
        navigation: "About",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptContactUs.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptContactUs.schema.paths));
              }
              return Object.keys(DeptContactUs.schema.paths);
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
      resource: DeptProgrammeInfo,
      options: {
        navigation: "Academic",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(
                  Object.keys(DeptProgrammeInfo.schema.paths)
                );
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(
                  Object.keys(DeptProgrammeInfo.schema.paths)
                );
              }
              return Object.keys(DeptProgrammeInfo.schema.paths);
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
      resource: DeptCoordinators,
      options: {
        navigation: "Academic",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptCoordinators.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptCoordinators.schema.paths));
              }
              return Object.keys(DeptCoordinators.schema.paths);
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
      resource: DeptSyllabus,
      options: {
        navigation: "Academic",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptSyllabus.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptSyllabus.schema.paths));
              }
              return Object.keys(DeptSyllabus.schema.paths);
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
      resource: DeptTimeTable,
      options: {
        navigation: "Academic",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptTimeTable.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptTimeTable.schema.paths));
              }
              return Object.keys(DeptTimeTable.schema.paths);
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
      resource: DeptCalender,
      options: {
        navigation: "Academic",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptCalender.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptCalender.schema.paths));
              }
              return Object.keys(DeptCalender.schema.paths);
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
      resource: PhdScholar,
      options: {
        navigation: "People",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(PhdScholar.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(PhdScholar.schema.paths));
              }
              return Object.keys(PhdScholar.schema.paths);
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
      resource: DeptStudents,
      options: {
        navigation: "People",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptStudents.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptStudents.schema.paths));
              }
              return Object.keys(DeptStudents.schema.paths);
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
      resource: Staff,
      options: {
        navigation: "Home",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(Staff.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(Staff.schema.paths));
              }
              return Object.keys(Staff.schema.paths);
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
      resource: DeptPub,
      options: {
        navigation: "Research And Labs",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptPub.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptPub.schema.paths));
              }
              return Object.keys(DeptPub.schema.paths);
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
      resource: DeptProjects,
      options: {
        navigation: "Research And Labs",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptProjects.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptProjects.schema.paths));
              }
              return Object.keys(DeptProjects.schema.paths);
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
      resource: DeptConsultancy,
      options: {
        navigation: "Research And Labs",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptConsultancy.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptConsultancy.schema.paths));
              }
              return Object.keys(DeptConsultancy.schema.paths);
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
      resource: DeptClub,
      options: {
        navigation: "Research And Labs",
        actions: {
          edit: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptClub.schema.paths));
              }
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
            isAccessible: canEditDept,
          },
          show: {
            layout: (currentAdmin) => {
              if (currentAdmin.role === "restricted") {
                return removefields(Object.keys(DeptClub.schema.paths));
              }
              return Object.keys(DeptClub.schema.paths);
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
    {
      resource: Events,
      options: {
        navigation: researchMenuName,
        actions: { list: { isAccessible: isAdmin } },
      },
    },
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
                  "department",
                  "name",
                  "email",
                  "password",
                  "img",
                  "position",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
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
                  "personal_link",
                  "journal",
                  "event",
                  "sourceOfInfo",
                  "show",
                  "order",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                  "__v",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "position",
                "department",
                "education_qualification",
                "address",
                "gender",
                "dob",
                "designation",
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
                "personal_link",
                "journal",
                "event",
                "sourceOfInfo",
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
                  "department",
                  "name",
                  "email",
                  "password",
                  "img",
                  "position",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
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
                  "personal_link",
                  "journal",
                  "event",
                  "sourceOfInfo",
                  "show",
                  "order",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                  "__v",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "position",
                "department",
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
                  "department",
                  "name",
                  "email",
                  "password",
                  "img",
                  "position",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
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
                  "personal_link",
                  "journal",
                  "event",
                  "sourceOfInfo",
                  "show",
                  "order",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                  "__v",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "position",
                "department",
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
                  "department",
                  "name",
                  "email",
                  "password",
                  "img",
                  "position",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
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
                  "personal_link",
                  "journal",
                  "event",
                  "sourceOfInfo",
                  "show",
                  "order",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                  "__v",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "position",
                "department",
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
                  "department",
                  "name",
                  "email",
                  "password",
                  "img",
                  "position",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
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
                  "personal_link",
                  "journal",
                  "event",
                  "sourceOfInfo",
                  "show",
                  "order",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                  "__v",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "position",
                "department",
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
                  "department",
                  "name",
                  "email",
                  "password",
                  "img",
                  "position",
                  "education_qualification",
                  "address",
                  "gender",
                  "dob",
                  "designation",
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
                  "personal_link",
                  "journal",
                  "event",
                  "sourceOfInfo",
                  "show",
                  "order",
                  "affiliations",
                  "createdAt",
                  "updatedAt",
                  "__v",
                ];
              }
              return [
                "name",
                "email",
                "img",
                "position",
                "department",
                "address",
                "gender",
                "dob",
                "designation",
                "nationality",
                "education_qualification",
                ,
                "book_publications",
                "conference_publications",
                "admin_responsibility",
                "patent",
                "phd_supervised",
                "phd_dissertion",
                "awards",
                "research_profile",
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
    {
      resource: AcademicCalendar,
      options: {
        navigation: "Academics",
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
    const faculty = await Faculty.findOne({ email });
    if (user) {
      const matched = password == user.password;
      if (matched) {
        return user;
      }
    } else if (faculty) {
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
