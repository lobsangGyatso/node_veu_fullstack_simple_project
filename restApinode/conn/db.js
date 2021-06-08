const express = require('express')
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/ecommerce",{useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex: true})
.then(() =>{
    console.log('connection is created')
}).catch((err)=>{
    console.log('connection is not created')
})