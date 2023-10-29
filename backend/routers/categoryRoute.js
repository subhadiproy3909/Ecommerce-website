const router = require('express').Router();


// local modules.
const {createCategory, fetchCategories} = require('./controllers/category');



router.post('/', createCategory).get('/', fetchCategories);


module.exports = router;