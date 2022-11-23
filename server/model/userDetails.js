import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const userDetailsSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        validation(value){
            if(!validator.isEmail(value))
            {
                console.log("Invalid Email Address");
            }
        },
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    coverImg:
    {
        type:String,
        default:"",
    },
    profileImg:
    {
        type:String,
        default:"",
    },
    followers:{
        type:Array,
        default:[],
    },
    followings:{
        default:[],
        type:Array,
    },
    isAdmin: {
        type: Boolean,
        default: false,
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



// userDetailsSchema.pre("save", async function(next){
//     // const isPasswordMatch = (this.password === this.confirmPassword);
    

//     //thn next line will only occur when someone changes the password
//     if(this.isModified("password"))
//     {
//             // console.log("hi2")
//             this.password = await bcrypt.hash(this.password,12);
//             this.confirmPassword = await bcrypt.hash(this.confirmPassword,12);
//     }
//     next();   
// })


// userDetailsSchema.methods.generateAuthenticationToken = async function(){

//     try{
//         // console.log(this._id.toString());
//         const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
//         // console.log(token);
//         this.tokens = this.tokens.concat({token:token});
//         // console.log(this.tokens);
//         const saveInDb = await this.save();
//         return token;
        
//     }catch(e){
       
//         console.log(e)
//     }
// }

//for storing the message
// userDetailsSchema.methods.addMessage = async function(name,email,phone,message){
//     try
//     {
//             this.messages = this.messages.concat({
//                 name:name,
//                 email:email,
//                 phone:phone,
//                 message:message})

//                 const saveMessage = await this.save();
//                 return this.messages;
//     }
//     catch(e)
//     {
//         console.log(e);
//     }
// }


const UserDetails = mongoose.model("UserDetail",userDetailsSchema);



export default UserDetails;