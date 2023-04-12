const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const CoordSchema = new mongoose.Schema(
    {

        "PROGRAMME": {
            type: String
        },
        "COORDINATOR": {
            type: String
        },

        department: {
            type: String,
            enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
        },
        show: { type: Boolean, default: true },
        order: {
            type: Number,
        },
        sourceOfInfo: {
            type: String,
        },
    }, {
    timestamps: true,
}
);

//Model---------------------------->
const Model = mongoose.model("deptCoordinators", CoordSchema);

//Export----------------------------->
module.exports = Model;

