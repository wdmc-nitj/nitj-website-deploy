const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
    department:{
        type:String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cw', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
    },
    name:{
      type:String
    },
    title: {type:String},
    img: {type:String},
    type:{
      type:String,
      enum:["Club","Team","Societies"]
    },
    description: { type: String, default: "" },
    show: { type: Boolean, default: true },
    FacebookUrl: { type: String },
    InstagramUrl: { type: String },
    TwitterUrl: { type: String },
    LinkedinUrl: { type: String },
    sourceOfInfo: {
      type:  String
  },
},{timestamps:true})

module.exports=mongoose.model("departmentClubs",Schema);