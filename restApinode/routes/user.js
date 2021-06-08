const express = require('express')
const User = require('../model/user')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash')
    // const productList = await Product.find().select('name image') this willme name and iamge not thers -_id it will remove the id 
    if(!userList){
        req.status(500).json({
            success:false
        })
    }
    res.status(200).json({
        success:true,
        data: userList
    })
})

router.get(`/:id`, async (req, res) => {
    const userList = await User.findById(req.params.id)
    // const productList = await Product.find().select('name image') this willme name and iamge not thers -_id it will remove the id 
    if(!userList){
        req.status(500).json({
            success:false
        })
    }
    res.status(200).json({
        success:true,
        data: userList
    })
})

router.post(`/register`, async (req, res) => {
    console.log(req.body)
    try {
        const user= new User(req.body)
        const newUser = await user.save()
        return res.status(200).json({
            success: true,
            data:newUser
        })
    } catch (error) {
        return res.status(500).json({
            message:'prdodcut cannot be created'
        })
    }
  })

  router.post(`/login`, async  (req, res) =>{
    try{
        const email = req.body.email
        const password = req.body.passwordHash
        const user = await User.findOne({email})
        console.log('user is ', user)
        if(!user){
            return res.status(404).json({
                messge:' no such user'
            })
        }
        // const match = await bcrypt.compare(password, user.passwordHash)
        // console.log(match)
        if(user){
            // if user is autherized
            const token = generateAuthToken(user)
            // const refreshToken = jwt.sign({user},process.env.SECRET_KEY, {expiresIn:'15s'})
            return res.status(200).json({
                message:'success',
                token:token,
                user:user,
            })
        }
        else{
            return res.status(404).json({
                message:'password and username not match',
            }) 
        }
    }catch(err){
        return res.status(404).json({
            message:'password and username not match',
        })
    }
})


function generateAuthToken(user){
    return jwt.sign({user}, process.env.SECRET_KEY)
}


router.post(`/logout`, async (req, res) => {
    res.status(200).json({
        message:'logout'
    })
})
module.exports = router