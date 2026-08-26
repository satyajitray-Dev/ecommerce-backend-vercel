import addressschema from "../model/address.js";
import userSchema from "../model/user.js";
export const addaddress=async(req,res)=>{
    try{
        const{userId,name,fullname,city,adressline,state,pincode,isDefault}=req.body;
        const address=await addressschema.create({userId,name,fullname,city,adressline,state,pincode,isDefault});

        res.status(200).json({
            status: "200",
            success: true,
            message: "address added successfully",
            address
        })
    }catch(err){
       
        return res.status(500).json({
            status: "500",
            success: false,
            message: "server error"
        })
    }
}

//export const getaddress
export const getaddress= async(req,res)=>{
    try{
    const get= await addressschema.find({
        userId: req.params.id
    })
    res.status(200).json({
        status: "200",
        success: true,
        address: get});
    }catch(err){
        return res.status(500).json({
            status: "500",
            success: false,
            message: "server error"})
    }
}