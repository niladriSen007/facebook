import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const postDetailsSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    img:
    {
        type:String,
    },
    likes: {
        type: Array,
        default: [],
      },
    // tokens:[
    //     {
    //         token:{
    //             type:String,
    //             required:true
    //         }
    //     }
    // ]
},
{ timestamps: true }
)



const PostDetails = mongoose.model("PostDetail",postDetailsSchema);



export default PostDetails;