import cartschema from "../model/cart.js";
import orderschema from "../model/order.js";
import productSchema from "../model/product.js";
import addressschema from "../model/address.js";

export const placeorder = async(req,res)=>{
    try{
        const {userId} =req.params.id;
        const address= await addressschema.findOne({userId, isDefault: true});
        if(!address){
            return res.status(404).json({
                success: false,
                message: "address not found"});
        }
        // adress=await addressschema.findOne({userId, isDefault: true});
        const cart = await cartschema.findOne({userId}).populate("items.productId");
        if(!cart){
            return res.status(404).json({
                success: false,
                message: "cart not found"
            })
        }
        if(cart.items.length===0){
             return res.status(404).json({
                success: false,
                message: "cart is empty"
             })
         }
        const totalcartvalue= await cart.items.reduce((total,product)=> total + product.productId.price * product.quantity, 0);
        const order= await orderschema.create({
            userId,
            items: cart.items,
            toltalamount: totalcartvalue,
            address: address,
           

        });
        cart.items=[];
        await cart.save();
        res.status(201).json({
            success: true,
            order
        })

    }catch(err){
       
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}