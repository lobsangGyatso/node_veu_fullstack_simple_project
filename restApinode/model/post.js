const mongoose =  require('mongoose')
const postSchema = new mongoose.Schema({
    content : {
        type: String,
        require:'content is required'
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }]
})

const Post = new mongoose.model('Post', postSchema)

module.exports = Post