//import pruductSchema from "../model/product";
import productSchema from "../model/product.js";
import categoryschema from "../model/category.js";

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
       if(!results){
        return res.status(400).json({
                success: false,
                message: "Image is required"
            });
       }

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
        const limit = parseInt(req.query.limit) || 20;
        const skip= (page-1)*limit;
        const search= req.query.search||"";
        const category= req.query.category|| "";
        const filter={};
        if(search){
            filter.title={
                $regex: search, $options: "i"
            };
        }
        if(category){
            filter.category= category;
        }
        //const filter= search? { title: { $regex: search, $options: "i" } }: {};
        const product=await productSchema.find(filter).populate("category").sort({createdAt:-1}).skip(skip).limit(limit);       
        const totalproducts=  await productSchema.countDocuments(filter);
        const totalpages= Math.ceil(totalproducts / limit);
        res.status(200).json({
            success: true,
            totalpages: totalpages,
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
export const updateproduct = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // If an image was uploaded via multer
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      updateData.image = result.secure_url;

    }
    const updatedproduct = await productSchema.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedproduct) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID or payload",
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      updatedproduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server error",
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
