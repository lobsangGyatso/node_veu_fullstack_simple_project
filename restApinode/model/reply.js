const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;