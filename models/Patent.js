const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
    department:{
        type:String
    },
    title:{
        type:String
    },
    inventors:{
        type:[String]
    },
    patent_no:{
        type:String
    },
    
    sourceOfInfo: {
        type: Object,
        default: {
          name: null,
          email: null,
          designation: null,
          department: null,
        }
      },
    show: { type: Boolean, default: true },
    order:{
        type: Number,
    }
},{timestamps:true})

module.exports=mongoose.model("Patent",Schema);