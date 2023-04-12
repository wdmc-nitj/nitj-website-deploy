const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
    department:{
        type:String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
    },
    link: {type:String},
    type:{
      type:String,
      enum:["B.Tech","M.Tech","PhD","PG Diploma"]
    },
    sourceOfInfo: {
      type:  String
  },
},{timestamps:true})

module.exports=mongoose.model("deptTimeTable",Schema);