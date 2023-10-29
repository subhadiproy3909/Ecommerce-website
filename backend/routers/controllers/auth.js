const User = require('../../database/models/userModel');
const generateToken = require('../../database/dbconfig/tokenCreation');


const createUser = async (req, res) => {
    try {
        // res.send(req.body);
        const { username, email, password } = req.body;
        // console.log(`${username}, ${email}, ${password}`);

        const isUserExists = await User.findOne({ email });

        if (isUserExists) {
            res.sendStatus(403);
            return;
        }


        const user = await User.create({ username, email, password });

        if (user) {
            const token = generateToken(user.id);

            res.cookie('jwt', token, { expires: new Date(Date.now() + (2 * 60 * 60 *1000)), httpOnly: true });
            res.status(200).json({id: user.id, addresses: user.addresses, email: user.email, role: user.role});
        }
    }
    catch (err) {
        console.log(`create user: ${err.message}`);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user || await user.comparePassword(password) === false) {
            res.status(401).json(`invalid credentials.`);
        }

        const token = generateToken(user.id);
        res.cookie('jwt', token, { expires: new Date(Date.now() + (2 * 60 * 60 *1000)), httpOnly: true});
        res.status(200).json({id: user.id, addresses: user.addresses, email: user.email, role: user.role});
    } catch (error) {
        console.log(`login auth error: ${error.message}`);
    }
}

const checkAuth = async (req, res) => {
    try {
        
        if (req.cookies) {
            const user = await User.findOne(req.user);
            res.status(200).json({id: user.id, addresses: user.addresses, email: user.email, role: user.role});
        }
        // if(req.user){
        //     res.status(200).json(req.user);
        // }
        else {
            return res.sendStatus(500);
        }
    }
    catch (err) {
        console.log(`check auth error: ${err.message}`);
    }
}

const logout = async (req, res) =>{
    try{
        res.cookie('jwt', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        }).sendStatus(200);
    }
    catch(err){
        console.log(`logout uesr: ${err.message}`);
    }
}

module.exports = { createUser, loginUser, checkAuth, logout };