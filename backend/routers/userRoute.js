const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');



// local modules.
const {fetchUserById, updateUser} = require('./controllers/user');


// user.

router.get('/own', auth, fetchUserById).patch('/:id',auth ,  updateUser);


module.exports = router;


// auth.

// router.post('/signup', );