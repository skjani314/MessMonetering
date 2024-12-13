import mongoose from 'mongoose';



const complaintSchema = new mongoose.Schema({
    from: {default:null,required:true,type:mongoose.Schema.Types.ObjectId,ref:'users'},
    issue: {
      type: String,
      required: true, 
    },
    category: {
      type: String,
      required: true, 
    },
    image_array: {
      type: [String], 
      default: [], 
    },
    des: {
      type: String, 
      required: true,
    },
    level:{
      type:Number,
      required:true
    }
});
const Complaint=new mongoose.model("complaints",complaintSchema);

export default Complaint;