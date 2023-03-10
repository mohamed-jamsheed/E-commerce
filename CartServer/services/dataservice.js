
const db = require('./db')

// all-products
const allProducts = ()=>{
    return db.Product.find().then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    products:result
                }
            }      
            else{
                return{
                    statusCode:404,
                    message:"No data is present"
                }
            }      
        }
    )
}

// view-product
const viewProduct = (id)=>{
    return db.Product.findOne({
        id
    })
    .then(
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    product:result
                }
            }
            else{
                return{
                statusCode:404,
                message:"Product is unavailable"
            }
        }
        }
    )
}

// addtowishlist
const addtowishlist = (product)=>{
    return db.Wishlist.findOne({
        id:product.id
    }).then(result=>{
        if(result){
            return{
                statusCode:401,
                message:"Item is already present in your wishlist"
            }
        }
        else{
            let newProduct = new db.Wishlist({
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating: {
                  rate: product.rating.rate,
                  count: product.rating.count
                }
            })
            newProduct.save()
            return{
                statusCode:200,
                message:"Item added to your wishlist"
            }
        }
    })
}

// getwishlist
const getwishlist = ()=>{
    return db.Wishlist.find().then(
   
        (result)=>{
            if(result){
                return{
                    statusCode:200,
                    wishlist:result
                }
            }
            else{
                return{
                statusCode:404,
                message:"Wishlist is empty"
            }
        }
        }
    )
}

// deleteItemwishlist 
const deleteItemwishlist = (id)=>{
    return db.Wishlist.deleteOne({id})
    .then((result)=>{
        if(result){
            // if delete successful then get the updated wishlist
            return db.Wishlist.find().then(
                 (result)=>{
                    if(result){
                        return{
                            statusCode:200,
                            wishlist:result
                        }
                    }
                    else{
                        return{
                        statusCode:404,
                        message:"Wishlist is empty"
                    }
                }
                }
            )
        }
        else
        {
            return{
                statusCode:404,
                message:"Item not found"
            }
        }
    })
}

module.exports = {
    allProducts,
    viewProduct,
    addtowishlist,
    getwishlist,
    deleteItemwishlist
}