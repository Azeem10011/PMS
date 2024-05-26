const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaxSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  percentage:{
    type:Number,
    required:true,
  },
  tax_type: {
    type: String,
    enum: ['government', 'private'],
    required: true,
  },
  is_active:{
    type:Boolean,
    default:true,
    required:true,
  },

}, { timestamps: true, toJSON: { getters: true } });

module.exports = mongoose.model('Tax', TaxSchema);