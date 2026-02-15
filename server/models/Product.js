import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        require: true,
    },
    description:{
        type:String,
        require: true,
    },
    image:{
        type:String,
        require: true,
    },
    price:{
        type:Number,
        require: true,
    },
    duration:{
        type:Number,
        require: true,
    },
    category:{
        type:String,
        require: true,
    },
   
    createdBy:{
        type:String,
        require: true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
})

export const Product = mongoose.model("Product",schema);