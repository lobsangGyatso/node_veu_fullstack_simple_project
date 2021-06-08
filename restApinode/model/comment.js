const mongoose =  require('mongoose')

const commentSchema = new mongoose.Schema({
    content : {
        type: String,
        require:'content is required'
    },
    post :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post',
        require:'post is required'
    },
    replies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Reply'
        }
    ]
})


const Comment = new mongoose.model('Comment', commentSchema)

module.exports = Comment