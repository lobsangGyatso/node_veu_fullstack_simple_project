const mongoose = require('mongoose');
const orderSchema = new  mongoose.Schema({
    orderItem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required: true
    }],
    shippingAddress1:{
        type:String ,
        require:true
    },
    shippingAddress1:{
        type:String,
        required: true 
    },
    city:{
        type:String,
        required: true
    },
    zip:{
        type:String,
        required: true
    },
    country:{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    },  
   
    status:{
        type:String,
        required: true,
        default:'pending'
    },
    totalPrice:{
        type:Number,
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateOrdered:{
        type: Date,
        default: Date.now
    }
})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order