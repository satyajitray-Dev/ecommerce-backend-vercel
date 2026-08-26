import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const address=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"

    },
    fullname: {
    type: String,
    required: true
    },
    city: {
    type: String,
    required: true  
    },
    adressline: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required:true
    },
    isDefault: {
      type: Boolean,
      default: false
    }

},{
    Timestamp: true
})
const addressschema= mongoose.model("address",address);
export default addressschema;