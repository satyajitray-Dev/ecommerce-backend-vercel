import mongoose from 'mongoose';
 const productsch= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min:[0,"number must be positive"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    image: {
        type: String,
        required: true
        //match: [/^https?:\/\/.+/, "image must be a valid URL"]

    },
    stock: {
        type: Number,
        default: 1
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"

    }

},{
    timestamps: true

 });
 const productSchema=mongoose.model("prosuct",productsch);
 export default productSchema;