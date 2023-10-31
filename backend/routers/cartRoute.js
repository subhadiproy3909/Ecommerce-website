const router = require('express').Router();

const Cart = require('../database/models/cartModel');
const auth = require('../middlewares/authMiddleware');


router.get('/', auth, async (req, res) => {
    try {

        // console.log(`cart user id: ${req.user}`);

        const cart = await Cart.find({ user: req.user }).populate('user', "id email addresses").populate("product");

        if (cart) {
            res.json(
                cart
                // {
                // id: cart.id,
                // items: cart.product
                // }
            );
        }
        else {
            res.sendStatus(500);
        }

    }
    catch (err) {
        console.log(`fetch cart by userID error: ${err.message}`);
    }
})


router.post('/', auth, async (req, res) => {

    try {
        const item = req.body;
        item.user = req.user;

        // const isExists = await Cart.findOne({$and: [ {user: req.user}, {product: item.product} ]});
        // if(isExists){
        //     res.sendStatus(401).json({message: "already added to the cart"});
        // }

        const data = await (await Cart.create(item)).populate('product');


        if (data) {
            res.json(data);
        }
        else {
            res.sendStatus(500);
        }

    } catch (error) {
        console.log(`add to cart error: ${error.message}`);
    }

})

router.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const reqBody = req.body;

        const data = await Cart.findByIdAndUpdate(id, reqBody, {new: true}).populate('product');

        if(data){
            res.status(200).send(data);
        }
        else{
            res.status(500).send(data);
        }
    }
    catch (err) {
        console.log(`cart update error: ${err.message}`);
    }

});

router.delete('/:id', async (req, res) =>{
    try{
        const {id} = req.params;

        const data = await Cart.findByIdAndDelete(id);

        if(data){
            res.status(200).json(data);
        }
        else{
            res.status(500).json(data);
        }
    }
    catch(err){
        console.log(`cart delete error: ${err.message}`);
    }
})



module.exports = router;