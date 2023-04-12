const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const CoordSchema = new mongoose.Schema(
    {

        Images: {
            type: [{
                link: {
                    type: String
                }
            }],
        },
        department: {
            type: String,
            enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf', 'cee', 'cai']
        },
        show: { type: Boolean, default: true },
        sourceOfInfo: {
            type: String
        },
    }, {
    timestamps: true,
}
);

//Model---------------------------->
const Model = mongoose.model("deptImages", CoordSchema);

//Export----------------------------->
module.exports = Model;

