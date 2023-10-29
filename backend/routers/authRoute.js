const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');


const {createUser, loginUser, checkAuth, logout} = require('./controllers/auth');


router.post('/signup', createUser).post('/login', loginUser).get('/check', checkAuth).get('/logout', logout);


// router.post('/', (req, res) =>{
//     req.cookies
// })

module.exports = router;