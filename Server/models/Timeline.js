import mongoose, { mongo } from "mongoose";

const timelineSchema=new mongoose.Schema({

date:{type:Date,default:Date.now},
complaint_id:{type:mongoose.Schema.Types.ObjectId,ref:'complaints',required:true},
status:{required:true,type:String}

})

const Timeline=new mongoose.model('timeline',timelineSchema);

export default Timeline;