const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:    
    }
})