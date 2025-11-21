const {donorAwardsModel}  = require("../../models/alumni/alumni");


const get = async(req,res)=>{
    try{
        const awards = await donarAwardsModel.find().sort({rank: 1});
        res.status(200).json(awards);
    }
    catch(e){
        res.status(400).json({
            Error: e
        })
    }
}

module.exports = {get};