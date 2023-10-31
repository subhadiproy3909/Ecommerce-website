const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');


const {createUser, loginUser, checkAuth, logout, resetPasswordRequest, resetPassword} = require('./controllers/auth');


router.post('/signup', createUser)
    .post('/login', loginUser)
    .get('/check', checkAuth)
    .get('/logout', logout)
    .post('/reset-password-request', resetPasswordRequest)
    .post('/reset-password', resetPassword);


// router.post('/', (req, res) =>{
//     req.cookies
// })

module.exports = router;