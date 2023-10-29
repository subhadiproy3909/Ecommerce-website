const mongoose = require('mongoose');

const dbConnect = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_CONNECT, {
            useUnifiedTopology: true,
        });

        console.log(`Database connected to: ${conn.connection.host}`);
    }
    catch(err){
        console.log(`database error: ${err.message}`);
    }
}

module.exports = dbConnect;