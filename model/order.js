import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const order=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    items:[{
        productId: {
            type:mongoose.Schema.Types.ObjectId,
            ref: "prosuct",
            required: true
        },
        quantity: Number,
        price: Number
    }],
    address:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "order"
    },
    toltalamount: Number,
    paymentmethod: {
        type: String,
        enum:["cod","online"],
        default: "cod",
        required: true
    },
    status: {
        type: "String",
        default: "placed"
    },


    
},{
    Timestamp: true
});
const orderschema=mongoose.model("order",order)
export default orderschema;