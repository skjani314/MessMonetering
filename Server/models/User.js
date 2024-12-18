import mongoose from 'mongoose';


const UserSchema=new mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,unique:true},
        password:{type:String,required:true},
        role:{type:String,required:true},
        img:String,
        designation:{type:String,required:true},
        user_id:String
    });
const User=new mongoose.model("users",UserSchema);

export default User;