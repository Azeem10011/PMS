const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

}, { timestamps: true, toJSON: { getters: true } });

module.exports = mongoose.model('Role', roleSchema);