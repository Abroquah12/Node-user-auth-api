import e from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true, // Ensure email is unique
    }
},{
    timestamps: true, // Automatically manage createdAt and updatedAt fields
})

export default mongoose.model('User', userSchema); // Export the User model