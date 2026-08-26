//import pruductSchema from "../model/product";
import productSchema from "../model/product.js";
import categoryschema from "../model/category.js";
;
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "ecommerce/products",
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};
//create product
export const createproduct = async (req,res)=>{
    try{
        const products = req.body;
       const results = await uploadToCloudinary(req.file.buffer);

        const image = results.secure_url;
      
        if(!products){
            return res.status(500).json({
                success: false,
                message: "ivalid tile/description/price/category/image/stock"
            });
        }
        const categoryexist= await categoryschema.findOne({id : products.category});
        if(!categoryexist){
            return res.status(200).json({
                success: true,
                message: "category doesn't match"
            })
        }
        const product= await productSchema.create({
        title: products.title, 
        price: products.price, 
        description: products.description, 
        image: image, 
        category: categoryexist._id,
        createdby: req.user.id
        });
        const result= await productSchema.findById(product._id).populate("category" );
        

        res.status(200).json({
            success: true,
            
            result
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "server error",err
        });
    }
}
 // get
export const getproduct= async(req,res)=>{
    try{
        const page= parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const skip= (page-1)*limit;
        
        const product=await productSchema.find().populate("category").sort({createdAt:-1}).skip(skip).limit(limit);

       
        const totalproducts=  await productSchema.countDocuments();
        const totalpages= Math.ceil(totalproducts / limit);

        res.status(200).json({
            success: true,
                currentPage: page,
            limit: limit,
    
            products: product
        })
    }
    
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "server error",err
        });
    }
}


export const getbyidproduct= async(req,res)=>{
    try{
        const product=await productSchema.findOne({_id: req.params.id}).populate("category",'name slug');

        res.status(200).json({
            success: true,
            product
        })

    }
    
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "server error",err
        });
    }
}
//update product
export const updateproduct= async(req,res)=>{
    try{

       const updatedproduct= await productSchema.findByIdAndUpdate(req.params.id, req.body,{new: true});
       if(!updatedproduct){
        return res.status(500).json({
            success: false,
            message: "ivalid id or body"
        });

       }
       res.status(200).json({
        success: true,
        message: "updated successfully",
        updatedproduct
       })
    }catch(err){
         console.log(err);
         res.status(500).json({
            success: false,
            message: "server error"
        });
    }
}
 export const deleteproduct=(req,res)=>{

    productSchema.findByIdAndDelete(req.params.id)
    .then( deletedProduct =>{

         if (!deletedProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }
        res.status(200).json({
            success: true,
            message: "product deleted successfully"
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            success: false,
            message: "server error",err
        })
    })
   
 }


 export const deletemanyproduct=(req,res)=>{
    const {ids}=req.body;
    productSchema.deleteMany({_id: {$in: ids} })
    .then( deletedProduct =>{

         if (!deletedProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }
        res.status(200).json({
            success: true,
            message: "product deleted successfully"
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            success: false,
            message: "server error",err
        })
    })
   
 }
