import mongoose from 'mongoose';


const UserSchema=new mongoose.Schema(
    {
        name:String,
        email:{type:String,unique:true},
        password:String,
        role:String,
        img:String,
        designation:String,
        user_id:String
    });
const User=new mongoose.model("users",UserSchema);

export default User;