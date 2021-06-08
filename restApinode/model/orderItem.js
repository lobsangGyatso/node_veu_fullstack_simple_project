const mongoose = require('mongoose');
const order = require('./order');
const product = require('./product');

const orderItemSchema = mongoose.Schema({
    quantity:{
        type: Number,
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        // require: true
    }
})


const OrderItem = new mongoose.model('OrderItem', orderItemSchema)

module.exports = OrderItem