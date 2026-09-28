import cartschema from "../model/cart.js";
import productSchema from "../model/product.js";
import userSchema from "../model/user.js";
import categoryschema from "../model/category.js";
import { ReturnDocument } from "mongodb";

export const addcart=async(req,res)=>{
    try{
    const { userId, items } = req.body;
     const userexist= await userSchema.findById(userId);
    if(!userexist){
        return res.status(500).json({
            status: "500",
            success: false,
            message: "user doesnt exist"
        })
    }
    let cart= await cartschema.findOne({userId});
    for (const item of items) { 
    const { productId, quantity } = item;
    const productexist= await productSchema.findById(productId);
    if(!productexist){
        return res.status(500).json({
            status: "500",
            success: false,
            message: "product doesnt exist"
        })
    }
    //let cart= await cartschema.findOne({userId});
    if(!cart){
        cart = await cartschema.create({
            userId: userId,
            items:[
                {productId: productId,
                quantity: quantity || 1}
            ]
        })
    }else{
        const itemexist= cart.items.find(i=>i.productId.toString()===productId);
        if(itemexist){
            itemexist.quantity += quantity||1;
        }else{
            cart.items.push({
                productId: productId,
                quantity: quantity || 1
            })
        }
    }
}
        await cart.save();
        
    
    const result= await cartschema.findById(cart._id).populate("userId","-password").populate({
    path: "items.productId",
    populate: {
        path: "category"
    }
});
    res.status(200).json({
        status: "200",
        success: true,
        result
        
    })



}catch(err){
        console.log(err);
        res.status(500).json({
            status: "500",
                success: false,
            message: "server error"
        })
    }
}

export const deletecart= async(req,res)=>{
    try{
        const deletecart= await cartschema.findByIdAndDelete(req.params.id);
        
        if (!deletecart) {
            return res.status(404).json({
                status: "404",
                success: false,
                message: "Cart not found"
            });
        }
        res.status(200).json({
            status: "200",
            success: true,
            message: "cart deleted succesfully"
        })
    }
    catch(err){
        res.status(500).json({
            status: "500",
            success: false,
            message: "server err",err
        })
    }
}
export const deleteitems=async(req,res)=>{
    try{
        const {userId,productId}= req.body;
        const deletecartitem= await cartschema.findOneAndUpdate({userId: userId}, {$pull: {items: { productId: productId}}}, {ReturnDocument: "after"});
        
        if (!deletecartitem) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }
        res.status(200).json({
            status: "200",
            success: true,
            message: "item deleted"
        })
    }catch(err){
        return res.json({
            status: "404",
            success: false,
            message: "server error"});
    }
}
export const getcart= async(req,res)=>{
    try{
        const userId =req.params.id;
        const get = await cartschema.findOne({userId: userId}).populate("userId","-password").populate({path: "items.productId", populate: {path: "category"}});
        if(!get){
            return res.status(500).json({
                status: "500",
                success: false,
                message: "user not found"
            })
        }
        res.status(200).json({
            status: "200",
                success: true,
            get
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            status: "500",
                success: false,
            message: "server error"
        })
    }
}
