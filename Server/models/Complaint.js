import mongoose from 'mongoose';



const complaintSchema = new mongoose.Schema({
  from: { default: null, required: true, type: mongoose.Schema.Types.ObjectId, ref: 'users' },
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
  level: {
    type: Number,
    required: true
  },
  resolved_by: {

    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  },
  current_status: { type: String },
  date: { type: Date, default: Date.now },
  res_des: { type: String },
  res_array: {
    type: [String],
    default: [],
  },

});
const Complaint = new mongoose.model("complaints", complaintSchema);

export default Complaint;