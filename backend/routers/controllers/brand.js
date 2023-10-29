


// local modules.
const Brand = require('../../database/models/brandModel');


const createBrand = async (req, res) =>{
    try {
        const data = await Brand.create(req.body);

        if(data){
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(`create brands error: ${err.message}`);
    }
}

const fetchBrands = async(req, res) =>{
    try{
        const brands = await Brand.find({}).populate('Product', 'brand');
    
        res.send(brands);
    }
    catch(err){
        console.log(`fetch brands error: ${err.message}`);
    }
}

module.exports = {createBrand, fetchBrands};