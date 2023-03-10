// import express
const express = require('express')
// import cors
const cors = require('cors')
const dataService = require('./services/dataservice')
const server = express()
server.use(cors({
    origin:'http://localhost:4200'
}))

server.use(express.json())

server.listen(3000,()=>{
    console.log('Cart server is listening at port number 3000');
})

// all-products Api
server.get('/all-products',(req,res)=>{
    dataService.allProducts().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// view-products Api
server.get('/view-products/:productId',(req,res)=>{
    dataService.viewProduct(req.params.productId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// addtowishlist api
server.post('/add-to-wislist',(req,res)=>{
    dataService.addtowishlist(req.body).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// get-wishlist Api
server.get('/get-wishlist',(req,res)=>{
    dataService.getwishlist().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// remove-item-wishlist Api
server.delete('/remove-item-wishlist/:productId',(req,res)=>{
    dataService.deleteItemwishlist(req.params.productId).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})