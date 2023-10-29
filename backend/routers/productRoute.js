const router = require('express').Router();


// local modules.
const Product = require('../database/models/product');
const {createProduct, fetchAllProduct, fetchProductById, updateProduct} = require('./controllers/products');

router.post('/', createProduct).get('/?', fetchAllProduct).get('/:id', fetchProductById).patch('/:id', updateProduct);

module.exports = router;


// if(reqQuery.category){
        //     query = await Product.find({ category: reqQuery.category });
        //     res.send(query);
        // }

        // if(reqQuery.brand){
        //     query = await Product.find({ brand: reqQuery.brand });
        // }

        // if(reqQuery._sort && reqQuery._order){
        //     query = await Product.find({}).sort({ [reqQuery._sort]: reqQuery._order });
        // }
        
        // if(reqQuery._page && reqQuery._limit){
        //     const pageLimit = reqQuery._limit;
        //     const page = reqQuery._page;
        //     query = await Product.skip(pageLimit * (page - 1)).limit(pageLimit);
        // }
