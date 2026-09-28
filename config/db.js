import mongoose from "mongoose";
const connectDB = async()=>{
    try{
        mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
          


    }catch(err){
        console.error(`error: ${err.message}`)
    }
}
export default connectDB;