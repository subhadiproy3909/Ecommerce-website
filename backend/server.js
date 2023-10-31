require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');



const app = express();


// Sending email through nodemailer.




// local modules.
const dbConnect = require('./database/dbconfig/dbconn');

dbConnect();


const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

// Mail endpoint.



// PAYMENTS GET WAY.

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/create-payment-intent', async (req, res) => {
    console.log("payment gete way active");
    const { totalAmount, orderId } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount * 100, // for decimal compensation
        currency: 'inr',
        automatic_payment_methods: {
            enabled: true,
        },
        metadata: {
            orderId,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

// Webhook.

const endpointSecret = process.env.ENDPOINT_SECRET;

app.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    async (request, response) => {
        const sig = request.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntentSucceeded = event.data.object;
                console.log("payment succeeded.");
                const order = await Order.findById(
                    paymentIntentSucceeded.metadata.orderId
                );
                order.paymentStatus = 'received';
                await order.save();

                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send();
    }
);


app.listen(PORT, () => {
    console.log("Listening to ", PORT);
})