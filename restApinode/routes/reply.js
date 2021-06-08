const express =  require('express');
const router = express.Router();
const Reply = require("../model/reply");
const Comment = require('../model/comment');
const Post = require('../model/post');

router.post(`/:commentId/reply`, async (req, res) => {
    console.log('dir is',__dirname  )
    const comment = await Comment.findById(req.params.commentId);
    if(!comment){
        return res.status(400).json({
            success:'fail',
            message:'comment couldnt find'
        })
    }
    try {
        const reply = new Reply({
            content:req.body.content,
            comment:comment._id
        })
        const newReply = await reply.save()
        console.log('new reply object is', newReply)
        comment.replies.push(newReply._id)
        await comment.save()
        return res.status(200).json({
            success:'pass',
            data: newReply
        })
    } catch (error) {
        return res.status(400).json({
            success:'fail',
            data:error
        })
    }
});


router.post(`/edit`, async(req, res) =>{
    try {
        const comment = await Comment.findByIdAndUpdate(
            req.body._id,
            {
                content: req.body.content
            },
            {new : true}
        )
        console.log(comment)

        res.status(200).json({
            success: 'pass',
            data: comment
        })
    } catch (error) {
        return res.status(400).json({
            success:'fail',
            data: error
        })
    }
   
});


router.delete(`/:commentId/delete`, async (req, res) => {
    console.log(req.params.commentId)
    try {
        const comment = await Comment.findById(req.params.commentId);
        const deleteComment = await Comment.findByIdAndDelete(req.params.commentId);
        const selectedPost = await Post.updateMany(
            {_id:comment.post},
            {
                $pull: {comments: req.params.commentId}
            }
        )
        console.log('sdfsdf', selectedPost)
        res.status(200).json({
            success:'pass'
        })
        // const deletecommnetinsidepost = await Post.find();
        // const last =Promise.all(deletecommnetinsidepost.map( async(item, index) => {
        //    const ll = item.comments.filter(item => {
        //        return item != req.params.commentId
        //    })
        //    return ll
        // }))
        // const l = await last
        // console.log(l[0])
        // await Post.findByIdAndUpdate(
        //     comment.post,
        //     {comments: l[0]},
        //     {new: true}
        //     )
    } catch (error) {
        
    }



    // const postId = req.params.postId
    // const newComment = await Comment.create(req.body)
    // const addCommentToBlog = await Post.findByIdAndUpdate(
    //     postId,
    //     {
    //         $push:{comments: newComment._id}
    //     }
    // )

   
})

module.exports = router