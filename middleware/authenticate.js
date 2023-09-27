const jwt = require("jsonwebtoken");
const User = require("./../models/users");

const authenticate = async (req, res, next) => {
    try{
        const token = req.cookies.jwtoken;
        
        if(token === undefined){
            res.redirect("/auth");
        }
        else{
            const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findOne({ _id: verifyToken.user._id });

            if(!user){
                throw new Error("You don't have admin rights");
            }

            next();
        }
    }
    catch(err){
        res.status(400).send("No token");
    }
}

module.exports = authenticate;