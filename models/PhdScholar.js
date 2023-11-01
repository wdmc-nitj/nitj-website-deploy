const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
    department:{
        type:String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    rollNumber:{
        type: String,
    },
    img:{
        type:String
    },
    position:{
        type:String
    }
    ,
    sourceOfInfo: {
        type:  String
    },
    show: { type: Boolean, default: true },
    order:{
        type: Number,
    }
},{timestamps:true})

module.exports=mongoose.model("PhdScholar",Schema);