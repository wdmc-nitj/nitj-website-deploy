const {alumniModel}  = require("../../models/alumni/alumni");

const get = async(req,res)=>{
    try{
        const alumnus = await alumniModel.find().sort({order:1});
        res.status(200).json(alumnus);
    }
    catch(e){
        res.status(400).json({
            Error: e
        })
    }
}

module.exports = {get};