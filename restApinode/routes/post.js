const express = require('express')
const router = express.Router()

const Post = require('../model/post')

router.post(`/`, async (req, res) => {
    console.log(req.body)
    try{
        const post = await Post.create(req.body);
        if(post){
            return res.status(200).json({
                message:'created',
                data:{
                    data:post
                }
            })
        }
    }catch(err){
        return res.status(203).json({
            message:'err',
            data:{
                data:' '
            }
        })
    }
})

router.get(`/`, async (req, res) => {
    try {
        let post = await Post.find().populate("comments").populate({path:'comments',populate:'replies'})
        res.status(200).json({
            message:'success',
            post
        })
    } catch (error) {
        return res.status(500).json({
            message:'fail'
        })
    }
})

const Comment = require('../model/comment');

router.delete(`/:postId`, async (req, res) => {
    console.log('we are in delte post', req.params.postId)
    const post = await Post.findById(req.params.postId);
    post.comments.map(async(item, index) => {
        console.log(item)
       await Comment.findByIdAndDelete(item)
    })

})

module.exports = router