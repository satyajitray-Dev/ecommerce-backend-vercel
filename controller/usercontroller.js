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
           status: "success",
           updateduser: update
        });
    }catch(err){
        return res.status(500).json({
            status: "failed",
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