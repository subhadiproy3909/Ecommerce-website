const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
        min: [1, "worong min price"],
    },
    discountPercentage:{
        type: Number,
        min: [1, "wrong min discount"],
        max: [99, "wrong max discount"],
    },
    discountPrice: {
        type: Number,
        // required: true,
    },
    rating:{
        type: Number,
        // required: true,
        min: [0, "wrong min rating"],
        max: [5, "wrong max rating"],
        default: 0,
    },
    stock:{
        type: Number,
        required: true,
        min: [0, "wrong min stock"],
        default: 0,
    },
    brand:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    images:{
        type: [String],
        required: true,
    },
    colors:{ 
        type : [mongoose.Schema.Types.Mixed] 
    },
    sizes:{ 
        type : [mongoose.Schema.Types.Mixed]
    },
    highlights:{ 
        type : [String] 
    },
    deleted: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
});

const virtual = productSchema.virtual('id');
virtual.get(function(){
    return this._id;
});

productSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        delete ret._id;
    }
});

module.exports = mongoose.model('Product', productSchema);

// [{
//         "id": 1,
//         "title": "iPhone 9",
//         "description": "An apple mobile which is nothing like apple",
//         "price": 549,
//         "discountPercentage": 12.96,
//         "rating": 4.69,
//         "stock": 94,
//         "brand": "Apple",
//         "category": "smartphones",
//         "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//         "images": [
//             "https://i.dummyjson.com/data/products/1/1.jpg",
//             "https://i.dummyjson.com/data/products/1/2.jpg",
//             "https://i.dummyjson.com/data/products/1/3.jpg",
//             "https://i.dummyjson.com/data/products/1/4.jpg",
//             "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
//         ]
//     }]