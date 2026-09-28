import express from "express";
import userSchema from "../model/user.js";
export const update= async(req,res)=>{
    try{
        const body= req.body;
        if(!body){
            return res.status(400).json({
                message: "invalid body"
            })
        }
        const update = await userSchema.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({
           success: true,
           updateduser: update
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}
export const userdelete= async (req,res)=>{
    try{
        const deletee= await userSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success"
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            massage: "server error"
        })
    }


}
export const allusers=async(req,res)=>{
    try{
        
        const users= await userSchema.find().select("-password");
         res.status(200).json({
            success: true,
            length: users.length,
            users
        })
        
    }catch(err){
        res.status(500).json({
            message: "server error"
        })
        console.log(err);
    }

}
export const getuser=async(req,res)=>{
    try{
        const user= await userSchema.findOne({_id:req.params.id});
        if(!user){
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    }catch(err){
        return res.status(500).json({
            message: "server error "
              })
    }
}
