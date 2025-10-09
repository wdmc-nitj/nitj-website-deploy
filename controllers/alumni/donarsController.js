const {donorsModel}  = require("../../models/alumni/alumni");

const get = async(req,res)=>{
    try{
        const donors = await donarAwardsModel.find();
        res.status(200).json(donors);
    }
    catch(e){
        res.status(400).json({
            Error:e
        })
    }
}

module.exports = {get};