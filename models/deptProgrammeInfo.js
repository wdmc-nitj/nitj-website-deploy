const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
    department:{
        type:String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
    },
    "Program of Study":{
      type:String
    },
    branch:{
      type:String
    },
    "Program Specific Outcomes":{
      type:[String]
    },
    "Program Outcomes":{
      type:[String]
    },
    "Program Educational Objectives":{
      type:[String]
    },
    show:{
      type:Boolean,
    },
    sourceOfInfo: {
      type:  String
  },
},{timestamps:true})

module.exports=mongoose.model("deptProgrammeInfo",Schema);