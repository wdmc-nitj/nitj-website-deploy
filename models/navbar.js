const mongoose = require('mongoose');
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema({
    Administration:{
        type:Array,
        default:[]
    },
    Academics:{
        type:Array,
        default:[]
    },
    Admissions:{
        type:Array,
        default:[]
    },
    Research:{
        type:Array,
        default:[]
    },
    Alumni:{
        type:Array,
        default:[]
    },
    LifeatNITJ:{
        type:Array,
        default:[]
    }
}, {
    timestamps: true,
});

//Model---------------------------->
const Model = mongoose.model('Navbar', Schema);

//Export----------------------------->
module.exports = Model;