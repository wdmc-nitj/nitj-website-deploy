const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
    department:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    img:{
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

module.exports=mongoose.model("Alumni",Schema);