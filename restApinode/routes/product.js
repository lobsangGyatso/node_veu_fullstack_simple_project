const express = require('express')
const Product = require('../model/product')
const multer = require('multer')
const { Category } = require('../model/category')
const router = express.Router()

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split(" ").join('_')
      const extension = FILE_TYPE_MAP[file.mimetype]
      cb(null, `${fileName}- ${Date.now()}.${extension}`)
    }
})
  
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
const upload = multer(
    { storage: storage, fileFilter: fileFilter }
    )

router.get(`/`, async (req, res) => {
    try {
        const productList = await Product.find()
        res.status(200).json({
            success:true,
            data: productList
        })
    } catch (error) {
        return res.status(500).json({
            success:false
        })
    }
   
    // const productList = await Product.find().select('name image') this willme name and iamge not thers -_id it will remove the id 
  
    
})


router.get(`/:id`, async (req, res) =>{
    const product = await Product.findById(req.params.id).populate('Category')
    if(!product){
        req.status(500).json({
            success:false
        })
    }
    res.status(200).json({
        success:true,
        data: productList
    })
})


router.post(`/`,upload.single('image'), async (req, res) => {

    console.log(req.body.category, req.file)
    const category = await Category.findById(req.body.category)
    console.log(category)
    if(!category){
        return res.status(400).json({
            message:'cateroy doesnt exit'
        })
    }

    try {
        const fileName = req.file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
        const product= new Product({
            name: req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image: `${basePath}${fileName}`,
            brand: req.body.brand,
            price: req.body.price,
            category: category._id,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReview: req.body.numReview,
            isFeatured: req.body.isFeatured
        })
      
        const newProduct = await product.save()
        return res.status(200).json({
            success: true,
            data:newProduct
        })
    } catch (error) {
        return res.status(500).json({
            message:'prdodcut cannot be created'
        })
    }

  


})


router.put(`/:id`, async (req, res) => {
    const category = await Category.findById(req.body.category)
    if(!catefory){
        return res.status(400).json({
            message:'cateroy doesnt exit'
        })
    }
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    if(!product){
        return res.status(500).json({
            message:'product cannot be update'
        })
    }
    res.status(200).json({
        success:false,
        data: product
    })
})


router.delete(`/:id`, async (req, res) =>{
    try {
        const product = await Product.findByIdAndRemove(req.params.id)
        if(product){
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


router.put('/gallery/:id', upload.array('images',10), async (req, res) => {
    const basePath = `${get.protocal}://${get.req(host)}/public/uploads`
    const files = req.files;
    const imagesPaths = []
    if(files){
        files.map(file =>{
            imagesPaths.push(`${basePath}${file.fileName}`)
        })
    }
   
    const product  = await  Product.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesPaths
        }
    )
})

// fiter by category
router.get(`/`, async (req, res) =>{
    // localhost:3000/api/v1/products?categories=22222,23234
    let query = {}
    if(req.query.categories){
        query = {categories: req.query.categories.split(',')}
    }

    const porduct = await Product.find(query).limit(5)
    // const porduct = await Product.find({category: ['2222', '23234']})
})
module.exports = router