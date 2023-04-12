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
    img:{
        type:String
    },
    position:{
        type:String
    },
    message:{
        type:String
    },
    phone:{
        type:String
    },
    vision:{
        type:String
    },
    mission:{
        type:String
    },
    QualityStatements:{
        type:String
    },
    sourceOfInfo: {
        type:  String
    },
    show: { type: Boolean, default: true },
    order:{
        type: Number,
    }
},{timestamps:true})

module.exports=mongoose.model("HOD",Schema);