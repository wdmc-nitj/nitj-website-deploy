const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
    department:{
        type:String,
        enum:['bt','ch','cy','ce','cw','cse','ee','ece','hm','ipe','it','ice','ma','me','ph','tt','cf','cee','cai','itep']
    },
    name:{
        type:String
    },
    designation:{
        type:String
    },
    email:{
        type:String
    },
    img:{
        type:String
    },
    sourceOfInfo:{
        type:String
    },
    show:{
        type:Boolean,
        default:true
    },
    order:{
        type:Number
    }
},{timestamps:true})

module.exports=mongoose.model("AdjunctFaculty",Schema);