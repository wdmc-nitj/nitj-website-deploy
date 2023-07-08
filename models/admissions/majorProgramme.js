const mongoose = require("mongoose");
const {commonFieldsForAll, regexForUpdateLogs, logUpdates} = require("../../utils.js");
let existingComment = {};

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        enum: ["Undergraduate Programme", "Post Graduate and Research Programme", "PhD Programme", "PG Diploma in Engineering Programme"]
    },
    subCategory: {
        type: String,
        enum: ["CCMT", "Self-Sponsored", "MSc", "MBA", "PG Diploma in Management"]
    }
});

const majorProgrammeSchema = new mongoose.Schema({
    category: {
        type: categorySchema,
        required: true
    },
    nameOfProgrammeOrComment: {
        type: String,
        required: true
    },
    new: {
        type: Boolean,
        default: false
    },
    isComment: {
        type: Boolean,
        default: false,
        validate: {
            validator: async function (v) {
                // Fixing validator for update operation, this object doesn't carry only data to be updated.
                // console.log("Testing 231",this._update);
                // console.log("Testing 123",this._update["$set"].category.category);
                
                // When we perform updation, we get the data to be updated in _update object.
                const category = this.category ? this.category.category : (this._update? this._update["$set"].category.category : null);
                const subCategory = this.category ? this.category.subCategory : (this._update ? this._update["$set"].category.subCategory : undefined);
                const isComment = this.isComment ? this.isComment : (this._update ? this._update["$set"].isComment : undefined);

                existingComment = await mongoose.model("MajorProgramme").findOne({isComment: true , "category.category" : category, "category.subCategory" : subCategory});
                return (existingComment && isComment ? false:true);
            },
            message: () => `There is already a comment named "${existingComment.nameOfProgrammeOrComment}". Kindly make it visible or update it!`
        }
    },
    ...commonFieldsForAll,
},{timestamps: true});

majorProgrammeSchema.pre(regexForUpdateLogs, logUpdates);


//Middleware to avoid more than one comment.
// majorProgrammeSchema.pre("save", async function(next) {
//     const existingComment = await this.constructor.findOne({isComment: true , "category.category" : this.category.category, "category.subCategory" : this.category.subCategory});

//     if(existingComment && this.isComment) {
//         const error = new Error(`There is already a comment in the admin panel named "${existingComment.nameOfProgrammeOrComment}". Kindly make it visible or update it.`);
//         error.errors = {};  //This was done in accordance with create-validation-errors.js file in /node_modules/@admin-bro/mongoose/lib/src/utils/create-validation-error.js
//         next(error);
//     }

//     next();
// });

// Dropped this pre middleware, as the error shows up in the console, not in the form itself.

const majorProgramme = mongoose.model("MajorProgramme",majorProgrammeSchema);

module.exports=majorProgramme;