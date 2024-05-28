const mongoose = require('mongoose');

let store = new mongoose.Schema({
    content:{type:String,default:""},
    title:{type:String,default:""}

})

module.exports = mongoose.model('store',store);