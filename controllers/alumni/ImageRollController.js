const {imageRollModel}  = require("../../models/alumni/alumni");

const get = async(req,res)=>{
    try{
        const images = await imageRollModel.find().sort({order:1});
        res.status(200).json(images);
    }
    catch(e){
        res.status(400).json({
            Error: e
        })
    }
}

module.exports = {get};