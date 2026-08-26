import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"name is required"]

    },
    email: {
        required: [true,"email required"],
        type: String,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"invalid email"]
    },
    password: {
        type: String,
        required: [true,"password must required"],
        minlength: [6,"passord must be  at least 6 character"]
    },
     id: {
        type: Number,
        unique: [true,"enter new id"]
    },
    role: {
        required: [true,"must required"],
        type: String,
        enum: {
            values: ['admin', 'customer'],
            message: "role must be admin or customer"
        }

    },
    avatar: {
        type: String,
        required: [true,"avatar must be required"],
        match: [/^https?:\/\/.+/, "Avatar must be a valid URL"]
    }
},{
            timestamps: true
        
});
const userSchema=mongoose.model("user",schema);
    
export default userSchema;
