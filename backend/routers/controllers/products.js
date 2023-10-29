
const Product = require('../../database/models/product');


const createProduct = async (req, res) => {
    try {
        const reqData = req.body;

        reqData.discountPrice = Math.round( reqData.price * (1 - reqData.discountPercentage / 100) );

        const data = await Product.create(reqData);

        if (data) {
            res.status(400).json(data);
        }
    }
    catch (err) {
        console.log(`product create error: ${err.message}`);
    }
}

const fetchAllProduct = async (req, res) => {
    try {
        // filter = {"category":["smartphone","laptops"]}
        // sort = {_sort:"price",_order="desc"}
        // pagination = {_page:1,_limit=10}

        const reqQuery = req.query;

        let query = Product.find({});
        let totalProduct = Product.find({});

        if (reqQuery.category) {
            query = query.find({ category: reqQuery.category });
            totalProduct = totalProduct.find({ category: reqQuery.category });
        }

        if (reqQuery.brand) {
            query = query.find({ brand: reqQuery.brand });
            totalProduct = totalProduct.find({ brand: reqQuery.brand });
        }

        if (reqQuery._sort && reqQuery._order) {
            query =  query.find({}).sort({ [reqQuery._sort]: reqQuery._order });
        }

        if (reqQuery._page && reqQuery._limit) {
            const pageLimit = reqQuery._limit;
            const page = reqQuery._page;
            query = query.skip(pageLimit * (page - 1)).limit(pageLimit);
        }

        const totalProductCount = await totalProduct.count().exec();

        const productQuery = await query.exec();

        if (productQuery) {
            res.set('X-Total-Count', totalProductCount);
            res.json(productQuery);
        }
    }
    catch (err) {
        console.log(`fetch products error: ${err}`);
    }
}

const fetchProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (product) {
            res.status(200).send(product);
        }
    }
    catch (err) {
        console.log(`fetch product by id error: ${err.message}`);
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedData = await Product.findByIdAndUpdate(id, req.body, { new: true });

        if (updatedData) {
            res.status(200).json(updatedData);
        }
    } catch (error) {
        console.log(`update product error: ${error.message}`);
    }
}


module.exports = { createProduct, fetchAllProduct, fetchProductById, updateProduct };