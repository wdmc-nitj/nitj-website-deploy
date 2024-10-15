const mongoose = require('mongoose');

const store = new mongoose.Schema({
    category:{type:String},
    content:{type:String,default:""},
    title:{type:String,default:""}

})

module.exports = mongoose.model('store',store);