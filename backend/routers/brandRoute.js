const router = require('express').Router();


// local modules.
const {createBrand, fetchBrands} = require('./controllers/brand');;


router.post('/', createBrand).get('/', fetchBrands);


module.exports = router;