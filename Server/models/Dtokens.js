import mongoose, { mongo } from "mongoose";

const DtokenSchema=new mongoose.Schema({

user_id:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
token:{required:true,type:String}

})

const Dtoken=new mongoose.model('dtoken',DtokenSchema);

export default Dtoken;