const mongoose = require("mongoose");

const Productschema = new mongoose.Schema({
    brandname: {
        type: String,
        required: true,
    },
    productname: {
        type: String,
        required: true,   
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    price: { // Single price field
        type: Number,
        required: true
    }
}, { collection: 'product' });

module.exports = mongoose.model('Product', Productschema);
