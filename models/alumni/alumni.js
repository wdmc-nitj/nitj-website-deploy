const {Schema} = require("mongoose");
const mongoose = require("mongoose");
const noticeSchema = new Schema({
    tile: {type:String, required : true},
    brief: {type:String, required:true},
    description: {type:String, required:true},
    image: {type: String, default: null},
    active: {type: Boolean, defualt: true},
    show:{type:Boolean, default: true}
},{
    timestamps: true
})


const recentEventSchema = new Schema({
    title: {type:String, required:true},
    description:{type:String, required: true},
    coverImage: {type:String, default:null},
    images:{type:[String], default:[]},
    otherLinks: [{
        title:{type:String,required:true}, 
        link:{type:String, required:true}
    }],
    show: {type: Boolean, default:true},
    active: {type: Boolean, default: true}
},{
    timestamps: true
})

const notableAlumnus = new Schema({
   alumni: {type:Schema.Types.ObjectId, ref: "alumniModel", required: true},
   order: {type: Number, required: true},
    achievements: [{
        title: {type:String, required:true}
    }]
},{
    timestamps: true
})


const imageRollSchema = new Schema({
    image:{type:String,required:true},
    order:{type:Number, required:true},
    show:{type:Boolean, default:true}
},{
    timestamps: true
})


const alumniSchema = new Schema({
    name:{type:String, required:true},
    image:{type:String,default:null},
    course: {type:String, default:null},
    admissionYear: {type:Number, default:null},
    passoutYear: {type:Number, default:null},
    branch: {type:String, default:null},
    designation: {type:String, default: null},
    rollNumber: {type:String, default: null},
    socials: [{
        platform: {type:String,required:true},
        link: {type:String,required:true}
    }],
},{
    timestamps: true
})

const donorAwards = new Schema({
    rank: {type:Number, required:true},
    tite:{type:String,required:true},
    range:{type:String,required:true},
    additionalRecognition: [{
        type:String,
        required:true
    }]
},{
    timestamps: true
})


const donors = new Schema({
    alumni :{type:Schema.Types.ObjectId, required:true, ref: "alumniModel" },
    amount: {type:Number, required:true},
    rank:{type:Number, required:true},
    cause: {type:String, required:true}
},{
    timestamps: true
})


const alumniModel = mongoose.model("alumniModel", alumniSchema);
const noticeModel = mongoose.model("noticeModel", noticeSchema);
const recentEventModel = mongoose.model("recentEventModel", recentEventSchema);
const notableAlumnusModel = mongoose.model("notableAlumnusModel", notableAlumnus);
const imageRollModel = mongoose.model("imageRollModel", imageRollSchema);
const donorAwardsModel = mongoose.model("donorAwardsModel", donorAwards);
const donorsModel = mongoose.model("donorsModel", donors);

module.exports = {alumniModel, noticeModel, recentEventModel, notableAlumnusModel, imageRollModel, donorAwardsModel, donorsModel}


