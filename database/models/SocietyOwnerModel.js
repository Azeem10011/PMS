const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocietyOwnerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    about_owner: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
    },
    contact_no: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("SocietyOwner", SocietyOwnerSchema);
