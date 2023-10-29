const router = require('express').Router();

const {createOrder, fetchOrderByUser, updateOrder, fetchAllOrders} = require('./controllers/order');


router.post('/', createOrder).get('/own/:id', fetchOrderByUser).patch('/:id', updateOrder).get("/?", fetchAllOrders);




module.exports = router;