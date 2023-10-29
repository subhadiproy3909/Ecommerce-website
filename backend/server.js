require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();


// local modules.
const dbConnect = require('./database/dbconfig/dbconn');

dbConnect();


const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
    exposedHeaders: ['X-Total-Count'],
}));


// router middlewares.
app.use('/products', require('./routers/productRoute'));
app.use('/categories', require('./routers/categoryRoute'));
app.use('/brands', require('./routers/brandRoute'));
app.use('/users', require('./routers/userRoute'));
app.use('/auth', require('./routers/authRoute'));
app.use('/cart', require('./routers/cartRoute'));
app.use('/orders', require('./routers//orderRouter'));


app.get('/', (req, res) =>{
    res.send("hello");
})


app.listen(PORT , () =>{
    console.log("Listening to ", PORT);
})