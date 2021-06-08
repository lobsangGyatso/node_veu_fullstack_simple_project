const express = require('express')
const { populate } = require('../model/order')
const Order = require('../model/order')
const OrderItem = require('../model/orderItem')
const router = express.Router()


router.get(`/`, async (req,res) => {
    const orderList = await Order.find().populate('user').sort({'dateOrdered':-1})
    if(!orderList){
        res.status(500).json({success: false})
    }
    res.status(orderList)
})

router.get(`/:id`, async (req,res) => {
    const order = await Order.findById(req.params.id)
    .populate('user')
    // .populate({path: 'orderItem', populate: 'product'})
    .populate({path: 'orderItem', populate:{path:'product', populate:'category'}})
    if(!orderList){
        res.status(500).json({success: false})
    }
    res.status(order)
})

router.post(`/`, async (req, res) =>{

    //  const orderItem = req.body.orderItem;
    //  const orderItemId =  orderItem.map(async(item) => {
    //     let newOrderItem = new OrderItem({
    //         quantity: orderitem.quantity,
    //         product: orderitem.product
    //     })
    //     newOrderItem = await newOrderItem.save()

    //     return newOrderItem._id;
    //  })wait newOrderItem.save()
    //     console.log(l)
        // let newOrderItem = new OrderItem();
    //     newOrderItem.quantity = 3;
    //     newOrderItem.product = 123333333;
    //    const l = a
    console.log(req.body    )
    const orderItemsId = Promise.all(req.body.orderItem.map(async (orderitem) => {
        let newOrderItem = new OrderItem();
        newOrderItem.quantity = orderitem.quantity;
        newOrderItem.product = orderitem.product;
        newOrderItem = await newOrderItem.save()

        return newOrderItem._id;
     })
     );
     const orderItemsResolve = await orderItemsId
    //  console.log(orderItemsId)
        const totalPrice = await Promise.all(orderItemsResolve.map(async (orderItemId) =>{
             const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
             const totalPrice  = orderItem.product.price * orderItem.quantity;
             return totalPrice
         }))
    
        const totalPrices = totalPrice.reduce((a,b) => a+b, 0)
    let order = new Order({
        orderItem:orderItemsResolve,
        shippingAddress1:req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrices,
        user: req.body.user
    })

   const neworderObj =  await order.save()
   console.log('order ', neworderObj)
    try {
      
    
       
       res.status(200).json({
           success:'pass',
           data: order
       })
    } catch (error) {
        return res.status(400).json({msg:'the order cannot be ', error})
    }

})


router.put(`/:id`, async (req,res) =>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        {new : true}
    )

    if(!order){
        return res.status(400).send('the category cannot be created')
    }
    res.send(order)
})


router.delete(`/:id`, async (req,res) =>{
    const removeorder = await Order.findByIdAndRemove(req.params.id)
    if(removeorder){
        removeorder.orderItem.map(async orderitem =>{
          const ll = await OrderItem.findByIdAndRemove(orderitem)
         })
    } 
    if(!removeorder){
        return res.status(400).send('cannot remove')
    }
    res.send(removeorder)
})


router.get(`/get/totalsales`, async (req, res) =>{
    const totalSale = await Order.aggregate([
        { $group: {_id: null, totalsale: {$sum: '$totalPrice'}}}
    ])

    if(!totalSale) {
        return res.status(400).send('the order sales cannot be genmerated')
    }
    res.send({totalSale:totalSale.pop().totalsale})
})

router.get(`/get/count`, async (req, res) => {
    const orderCount = await Order.countDocuments((count) => count)
    if(!orderCount){
        res.status(500).json({success:false})
    }
    res.send({
        orderCount: orderCount
    })
})


router.get(`/get/userorders/:userid`, async(req, res) => {
    const userorder = await Order.find({user: req.params.userid})
    .populate({path: 'orderItem', populate:{path:'product', populate:'category' }})
    if(!userorder){
        res.status(500).json({success:false})
    }
   res.status(200).json({
       success:'pass',
       data: userorder
   })
})
module.exports= router