import Product from "../models/product.js"

export const getProducts = async (req, res, next) => {
    try{
        const products = await Product.find()
        res.status(201).json({data: products})
    }
    catch (err){
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}