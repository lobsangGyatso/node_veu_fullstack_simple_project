const { Category } = require('../model/category')
const express = require('express');
const { json } = require('express');
const router = express.Router()


router.get('/', async (req, res) =>{
    try {
        const caterotyList = await Category.find()
        res.status(200).json({
            success:true,
            data: caterotyList
        })
    } catch (error) {
        return res.status(500).json({
           success:false
        })
    }
 

})


router.get('/:id', async (req, res) =>{
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json({
            success:true,
            data: category
        })
    } catch (error) {
        return res.status(500).json({
           success:false
        })
    }
 

})

router.post('/', async (req, res) =>{
    try {
        let category = new Category({
            name: req.body.name,
            icon:req.body.icon,
            color: req.body.color
        })
        console.log(category)
        const newCategory = await category.save()
        console.log(newCategory)
        res.status(201).json({
            message:'successfully added',
            data: newCategory
        })
    } catch (error) {
        return res.status(404).json({
            error: error,
            message:'nopno',
        })
    }
})


router.put('/:id', async (req, res) =>{
    try {
        let category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        )
        res.status(201).json({
            success: true,
            data: category
        })
    } catch (error) {
        return res.status(400).json({
            success:false
        })
    }
})

router.delete('/:id', async (req, res) =>{
    try {
        const category = await Category.findByIdAndRemove(req.params.id)
        if(category){
            return res.status(200).json({
                success:true,
                message:'category is deleted'
            })
        }
        return res.status(404).json({
            success:true,
            message:'category not found'
        })
        
    } catch (error) {
        return res.status(400).json({
            success:false,
            error: error
        })
    }
})


module.exports = router;