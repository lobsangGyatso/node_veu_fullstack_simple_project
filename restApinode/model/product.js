const mongoose = require('mongoose');
const productSchema = new  mongoose.Schema({
    name:{
        type:String ,
        require:'name is required'
    },
    description:{
        type:String,
        required: true 
    },
    richDescription:{
        type:String,
        default: ''
    },
    image:{
        type:String,
        default: ''
    },
    images:[
        {
            type:String
        }
    ],
    brand:{
        type:String,
        default: ''
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },
    countInStock:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        default:0
    },
    numReview:{
        type:Number,
        default:0
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }
})

const Product =mongoose.model('Product', productSchema)
module.exports = Product