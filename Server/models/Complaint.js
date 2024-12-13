import mongoose from 'mongoose';



const complaintSchema = new mongoose.Schema({
    from: {
      type: String,
      required: true
    },
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
    timeline:{default:null,required:true,type:mongoose.Schema.Types.ObjectId,ref:'timeline'},
});
const Complaint=new mongoose.model("complaints",complaintSchema);

export default Complaint;