const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DistrictSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  image:{
    type:String,
    default: null,
  },
  province: {
    type: Schema.Types.ObjectId,
    ref: 'Province',
    required: true,
  },
  
 
}, { timestamps: true, toJSON: { getters: true } });

module.exports = mongoose.model('District', DistrictSchema);