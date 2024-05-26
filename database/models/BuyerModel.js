const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  cnicValidator,
  phoneNumberValidator,
  emailValidator,
} = require("../../validators");

const BuyerSchema = new Schema(
  {
    image: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      trim: true,
    },
    father_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: emailValidator,
        message: "Invalid email format.",
      },
    },
    cnic: {
      type: String,
      validate: {
        validator: cnicValidator,
        message:
          "Invalid CNIC format. Use the format XXXXX-XXXXXXX-X and ensure the length is 15 characters.",
      },
    },
    contact_no: {
      type: String,
      validate: {
        validator: phoneNumberValidator,
        message: "Invalid phone number format. Use the format XXXX-XXXXXXX.",
      },
    },
    province: {
      type: Schema.Types.ObjectId,
      ref: "Province",
    },
    district: {
      type: Schema.Types.ObjectId,
      ref: "District",
      default: null,
    },
    permanent_cnic_address: {
      type: String,
      required: true,
      trim: true,
    },
    nationality: {
      type: String,
      enum: ["Foreign", "Pakistani"],
      default: "Pakistani",
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Buyer", BuyerSchema);
