const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
    department:{
        type:String,
        enum: ['bt', 'ch', 'cy', 'ce', 'cse', 'ee', 'ece', 'hm', 'ipe', 'it', 'ice', 'ma', 'me', 'ph', 'tt', 'cf','cee','cai']
    },
    title: {type:String},
    desc:{type: String},
    img:{type:String},
    incharge:{
      type: String,
    },
    location:{
      type: String
    },
    images: {
      type: [
        {
          'img':{
            type: String,
          },
          'heading':{
            type: String,
          },
          'desc':{
            type: String,
          }
        }
      ]
    },
    type:{
      type:String,
      enum:["Research Labs","Research Area","Department Labs","Infrastructure"]
    },
    
    sourceOfInfo: {
      type:  String
  },
    show: { type: Boolean },
    order:{
        type: Number,
    }
},{timestamps:true})

module.exports=mongoose.model("Infrastructure",Schema);