

// local modules.
const Category = require('../../database/models/categoryModel');


const createCategory =  async (req, res) =>{
    try {
        console.log(req.body);
        const data = await Category.create(req.body);
        if(data){
            res.status(200).json(data);
        }
    } catch (err) {
        console.log(`create categories error: ${err.message}`);
    }
}

const fetchCategories = async(req, res) =>{
    try{
        const categories = await Category.find({});
    
        res.send(categories);
    }
    catch(err){
        console.log(`fetch categories error: ${err.message}`);
    }
}

module.exports = {createCategory, fetchCategories};