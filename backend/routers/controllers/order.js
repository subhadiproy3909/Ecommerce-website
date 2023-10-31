const Order = require('../../database/models/orderModel');
const Product = require('../../database/models/product');
const {sendMail, invoiceTemplate} = require('../../services/commonServices');


const createOrder = async (req, res) => {
    try{
        const order = req.body;
        // console.log(order);

        const data = await Order.create(order);
        console.log(`order id: ${data}`);

        let mailingProduct
        for(let item of order.items){
            let product = await Product.findOne({_id: item.product.id});
            product.$inc('stock', -1*item.quantity);
            mailingProduct = product.title;
            await product.save();
        }

        if(data){
            const email = data.populate('user', "email");
            sendMail({email: email, subject: `Order ID: ${data.id} for ${mailingProduct} thank you.`, html: invoiceTemplate(data)});
            res.json(data);
        }
        else{
            return res.status(500);
        }
    }
    catch(err){
        console.log(`create order error: ${err.message}`);
    }
}


const fetchOrderByUser = async (req, res) =>{
    try{
        const {id} = req.params;
        console.log(`fetch user : ${id}`);

        const data = await Order.find({user: id});

        if(data){
            res.send(data);
        }
        else{
            res.send(500);
        }
    }
    catch(err){
        console.log(`fetch order by userID: ${err.message}`);
    }
}

const updateOrder = async (req, res) => {
    try{
        const {id} = req.params;
        const reqBody = req.body;

        const data = await Order.findByIdAndUpdate(id, reqBody, {new: true});

        if(data){
            res.send(data);
        }
        else{
            res.status(500);
        }
    }
    catch(err){
        console.log(`update order: ${err.message}`);
    }
}

const fetchAllOrders = async (req, res) =>{
    try{
        let orders = Order.find({deleted: {$ne: true}});
        let totalOrders = Order.find({deleted: {$ne: true}});

        if(req.query._sort && req.query._order){
            orders = orders.sort({[req.query._sort]: req.query._order});
        }

        const totalOrdersCount = await totalOrders.count().exec();

        if(req.query._page && req.query._limit){
            const pageSize = req.query._limit;
            const page = req.query._page;
            orders = orders.skip(pageSize * (page-1)).limit(pageSize);
        }

        if(orders){
            const data = await orders.exec();
            res.set('X-Total-Count', totalOrdersCount);
            res.status(200).json(data);
        }
        else{
            return res.status(500);
        }
    }
    catch(err){
        console.log(`fetch all order error: ${err.message}`);
    }
}



module.exports = {createOrder, fetchOrderByUser, updateOrder, fetchAllOrders};

