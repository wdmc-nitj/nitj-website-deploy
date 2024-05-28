const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
  {
    resourceName: {
      type: String,
      trim: true,
    },
    resourceType: {
      type: String,
      enum: [
        "newsLetter",
        "academicCalender",
        "annualReport",
        "accountStatement",
        "buildingAndWorkCommtteeMinutes",
        "senateMinutes",
        "financeCommitteeMinutes",
        "bogMinutes",
        "RTI replies",
        "other",
      ],
      trim: true,
    },
    resourceLink: {
      type: String,
      trim: true,
    },

    resourceFileType: {
      type: String,
      enum: ["pdf", "video", "audio", "image", "other"],
      trim: true,
      default: "pdf",
    },
    resourceDescription: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
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
    updateLogs: {
      type: Array,
      default: [],
    },
    show: {
      type: Boolean,
      default: true,
    },
    new: {
      type: Boolean,
      default: true,
    },
    newpage:{
      type: Boolean,
      default: true
    }
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
const Model = mongoose.model("Resource", Schema);

//Export----------------------------->
module.exports = Model;
