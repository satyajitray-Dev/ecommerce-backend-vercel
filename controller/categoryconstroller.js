import categoryschema from "../model/category.js";
import slugify from "slugify";
export const addcategory=async(req,res)=>{
    try{
        const {id,name}= req.body;
        if(!id || !name){
        return res.status(500).json({
                message: "ivalid body"
            })
        }

        const slugcreate = name.toLowerCase().trim().replace(/\s+/g, "-");
        const image= `/uploads/${req.file.filename}`;
        
        const result=await categoryschema.create({id, name, image: image,slug: slugcreate});
        res.status(200).json({
            result
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "server error"
        });
    }
}
export const deletecategory= async(req,res)=>{
    try{
        const deletecategory= await categoryschema.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: " category deleted"
        });
    } 
    catch(err){
        console.log(err);
        res.status(500).json({message: "server err"});
    }
}
export const updatecategory=async(req,res)=>{
    try{
        const {name,image} =req.body;
        const updateData={};
        if (name !== undefined) {
            updateData.name = name;
            updateData.slug = slugify(name, {
                lower: true,
                strict: true
            });
        }
        if(image !== undefined){
            updateData.image=  image;
        }

        const updatedcategory= await categoryschema.findByIdAndUpdate(req.params.id, updateData, {new: true});
        res.status(200).json({
            updatedcategory
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "server error"
        })
    }
}
export const getcategory=async(req,res)=>{
    try{
        const page=parseInt(req.query.page) || 1
        const limit= parseInt(req.query.limit) || 2;
        const skip= (page-1)*limit;

        const get= await categoryschema.find().sort({created: -1}).skip(skip).limit(limit);
        const totalcategory= await categoryschema.countDocuments();
        const totalpage= Math.ceil(totalcategory/limit);
        res.status(200).json({
            
                success: true,
            currentpage: page,
            totalcategory: totalcategory,
            totalpage: totalpage,
            category: get
        });

    }catch(err){
   
        res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}