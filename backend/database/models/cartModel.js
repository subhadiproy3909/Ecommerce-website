const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
    },
    size: {
        type: String,
        // required: true,
    },
},
    {
        timestamps: true,
    }
);

const virtual = cartSchema.virtual('id');
virtual.get(function(){
    return this._id;
});

cartSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
    }
});


module.exports = mongoose.model("Cart", cartSchema);