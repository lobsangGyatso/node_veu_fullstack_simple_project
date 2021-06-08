const express = require('express')
const router = express.Router()
const Post = require('../model/post')
const Comment = require('../model/comment')


router.post(`/:postId/comment`, async (req, res) => {
    console.log("we are in comment section", req.body)
    try {
        console.log(req.body)
        const  post = await Post.findOne({_id: req.params.postId})

        const comment = new Comment();
        comment.content = req.body.content
        comment.post = post._id
        const newComment = await comment.save()
        // associate post with comment 
        post.comments.push(comment._id)
        await post.save()
        res.status(200).json({
            message:'success',
            data:newComment
        })
    } catch (error) {
        return res.status(500).json({
            message:'fail'
        })
    }
    


    // const postId = req.params.postId
    // const newComment = await Comment.create(req.body)
    // const addCommentToBlog = await Post.findByIdAndUpdate(
    //     postId,
    //     {
    //         $push:{comments: newComment._id}
    //     }
    // )

});



module.exports = router