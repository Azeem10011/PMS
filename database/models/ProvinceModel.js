const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProvinceSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  districts: {
    type: [String],
    default: [],
  },
  image:{
    type:String,
    default: null,
  }
}, { timestamps: true, toJSON: { getters: true } });

module.exports = mongoose.model('Province', ProvinceSchema);