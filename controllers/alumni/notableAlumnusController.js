const {notableAlumnusModel}  = require("../../models/alumni/alumni");

const get = async(req,res)=>{
    try{
        const alumnus = await notableAlumnusModel.find().populate("alumni").sort({order:1});
        res.status(200).json(alumnus);
    }
    catch(e){
        res.status(400).json({
            Error: e
        })
    }
}

module.exports = {get}