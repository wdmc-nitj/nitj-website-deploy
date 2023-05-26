const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
  {
    messageText: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      default: "",
    },
    profileLink: {
      type: String,
      default: "",
    },
    qualification: {
      type: Object,
      default: {
        degree: "",
        university: "",
        year: "",
      },
    },
    image: {
      type: String,
      default: "",
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
    contact: {
      type: Object,
      default: {
        email: null,
        telNo: null,
        EPABX: null,
        Extn: null,
        fax: null,
      },
    },
    show: { type: Boolean, default: true },

    order: {
      type: Number,
      default: 0,
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
const Model = mongoose.model("Administration", Schema);

//Export----------------------------->
module.exports = Model;

// format of input in api calls

// Format of form:
// 1. it is has the above fields create input feild for all of them
// 2. for the source of info and contact create seperate fields in the form using the default object keys
// 3. keep the table below the input field to view what has been added
// 4. keep an update and delete button in the table
// 5. update pre filled vaues should come along with the update button in the new form
