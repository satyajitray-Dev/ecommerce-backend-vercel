import mongoose from "mongoose";
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongo connected");
         
          


    }catch(err){
        console.error(`error: ${err.message}`)
    }
}
export default connectDB;