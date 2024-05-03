const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true,  },
    clubName: { type: String, default: "Club Name" },
    description: { type: String, default: "Club-description" },
    objective: {
      type: [{
        description: {
          type: String,
          default: "Club-objective"
        }
      }],
    },
    type: { type: String, default: "Club-type" },
    clubLogo: { type: String, default: "", required: true },
    clubWebsiteURL: { type: String, default: "" },
    show: { type: Boolean, default: true },
    order: {
      type: Number,
      default: 0,
    },
    new: {
      type: Boolean,
      default: true,
    },
    sourceOfInfoName: {
      type: String,
    },
    sourceOfInfoEmail: {
      type: String,
    },
    sourceOfInfoDesignation: {
      type: String,
    },
    sourceOfInfoDepartment: {
      type: String,
    },

    upcomingEvents: {
      type: [{
        description: {
          type: String
        }
      }],
    },

    facultyCoordinator: {
      type: [{
        name: {
          type: String,
          default: "Faculty Name"
        },
        designation: {
          type: String,
          default: "Designation",
        },
        designationClub: {
          type: String,
          default: "Designation in Club",
        },
        department: {
          type: String,
          default: "Department",
        },
        email: {
          type: String,
          default: "Email",
        },
        image: {
          type:String,
          default:"https://www.iconpacks.net/icons/1/free-user-icon-244-thumb.png"
        }

      }],
    },

    studentCoordinator: {
      type: [{
        name: {
          type: String,
          default: "Student Name"
        },
        designationClub: {
          type: String,
          default: "Designation in Club",
        },

        department: {
          type: String,
          default: "Department",
        },
        year: {
          type: String,
          default: "Year",
        },
        email: {
          type: String,
          default: "Email",
        },
        phone: {
          type: String,
          default: "Phone",
        },
        image: {
          type:String,
          default:"https://www.iconpacks.net/icons/1/free-user-icon-244-thumb.png"
        }
      }],
    },

    // social links
    instagramHandleURL: {
      type: String,
      default: "",
    },
    facebookHandleURL: {
      type: String,
      default: "",
    },
    youtubeHandleURL: {
      type: String,
      default: "",
    },
    linkedinHandleURL: {
      type: String,
      default: "",
    },

    clubImages: {
      type: [{
        link: {
          type: String
        }
      }],
    },

    newPage: {
      type: Boolean,
    },
    updateLogs: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

//pre update hook for updateLogs---------------->

Schema.pre(/^findOneAndUpdate/, async function (next) {
  //check updated fields
  const updatedFields = Object.keys(this._update["$set"]);

  //compare fields with existing document in database
  const existingDoc = await this.model.findOne(this.getQuery());

  const changedFields = updatedFields.filter((field) => {
    return existingDoc[`${field}`] !== this._update["$set"][`${field}`];
  });

  //rempoving uneccesery fields from changed fields
  const unnecesseryFields = ["updatedAt", "updateLogs", "_id", "__v", "order"];

  const filteredChangedFields = changedFields.filter((field) => {
    return !unnecesseryFields.includes(field);
  });

  const updateLogsPrevious = existingDoc.updateLogs;
  const updateLogsNew = `${new Date().toLocaleString()} - ${filteredChangedFields.join(
    " "
  )}`;

  this._update["$set"].updateLogs = [...updateLogsPrevious, updateLogsNew];

  next();
});

//Model---------------------------->
const Model = mongoose.model("clubsPage", Schema);

//Export----------------------------->
module.exports = Model;