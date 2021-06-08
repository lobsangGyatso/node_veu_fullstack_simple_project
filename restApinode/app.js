const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
require("./conn/db")
const app = express()
require('dotenv/config')
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

const productsRoutes = require('./routes/product')
const categoriesRoutes = require('./routes/category')
const usersRoutes = require('./routes/user')
const ordersRoutes = require('./routes/order')
const commentRouter = require('./routes/comment');
const postRouter = require('./routes/post');
const replyRouter = require('./routes/reply');
const api = process.env.API_URL


app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/posts`, postRouter);
app.use(`${api}/post`, commentRouter);
app.use(`${api}/comment`, replyRouter);

app.listen(3000, (err) =>{
    console.log('app is listning on port 3000')
})