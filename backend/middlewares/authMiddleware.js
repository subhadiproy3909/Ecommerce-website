const jwt = require('jsonwebtoken');
const User = require('../database/models/userModel');

let token;

const auth = async (req, res, next) =>{
    try{
        if(req && req.cookies){
            token = req.cookies['jwt'];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await User.findById(decoded.id).select('id');

            next();
        }
    }
    catch(err){
        console.log(`auth middleware error: ${err.message}`);
    }
}

module.exports = auth;