

// local modules.
const Category = require('../../database/models/categoryModel');


const createCategory =  async (req, res) =>{
    try {
        const data = await Category.create(req.body);

        if(data){
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(`create brands error: ${err.message}`);
    }
}

const fetchCategories = async(req, res) =>{
    try{
        const categories = await Category.find({}).populate('Product', 'category');
    
        res.send(categories);
    }
    catch(err){
        console.log(`fetch brands error: ${err.message}`);
    }
}

module.exports = {createCategory, fetchCategories};