import { Timestamp } from 'mongodb';
import userSchema from '../model/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//signup

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
export const signupUser=async(req,res)=>{
   
    try{
       
        const {name,password,email,id}=req.body;
        const img=await uploadToCloudinary(req.file.buffer);
        if(!img){
            res.status(400).json({
                message: "image not get"
            })
        }
        const image= img.secure_url;

        if(!name || !email || !id || !password){
            return res.status(500).json({
            status: "500",
            success: false,
                message: "invalid name,password,email,id,role,avatar "})

        }
        const userexist=await userSchema.findOne({email});
        if(userexist){
             return res.status(500).json({
            status: "500",
            success: false,
                message: "user already exist"});
        }
    
        const hashpassword= await bcrypt.hash(password,10);
        const user=await userSchema.create({
            name,
            email,
            password: hashpassword,
            id,
           
            avatar:image

        });
        const{password: _, ...userData}=user.toObject();
      
        res.status(200).json({
             status: "200",
            success: true,
            message: "user created",
            User: userData
         });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
             status: "500 ",
            success: false,
            message: 'server error'
        });
    }
}

//login
export const login=async(req,res)=>{
    try{

        const {email,password}=req.body;
         if(!email || !password ){
            return res.status(500).json({
                status: 500,
                success: false,
                message: "enter valid password,email"})
        

        }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
        success: false,
        message: "Enter a valid email"
    });
    }
        const userexist= await userSchema.findOne({email:email});
        if(!userexist){
            return res.status(500).json({
                 status: "500 ",
                success: false,
                message: "user doesn't exist, please signup first "
            })
        }
        const match= await bcrypt.compare(password, userexist.password);
        if(!match){
            return res.status(500).json({
                 status: "500 ",
                success: false,
                message: "enter correct password"

            });
        }
        const token= jwt.sign(
            {id: userexist._id,
                role: userexist.role
            },process.env.secret_key,{expiresIn: "1d"})
        res.status(200).json({
             status: "200 ",
                success: true,
            message: "login successfull",
            userId: userexist._id,
            userrole: userexist.role,
            token: token
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: "500 ",
            success: false,
            message: Object.values(err).map(error=>error.message)
        })
    }
}


