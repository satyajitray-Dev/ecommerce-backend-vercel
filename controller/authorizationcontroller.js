import jwt from "jsonwebtoken";
export const protect= async(req,res,next)=>{
    try{
        const authheader= req.headers.authorization;
        if(!authheader){
            return res.status(404).json({
                status: "404",
                success: false,
                message: "token not valid"
            })
        }
        const token= authheader.split(" ")[1];
        const decode= jwt.verify(token, process.env.secret_key);
      
        if(decode.role !== "admin"){
            return res.status(404).json({
                status: "404",
                success: false,
                message: "admin only can access"
            })
        }
        
        req.user=decode;
        next();

    }catch(err){
        //console.log(err);
        res.status(500).json({
            status: "500",
            success: false,
            message: "server error",err
        })
    }
}