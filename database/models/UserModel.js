const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { emailValidator, passwordValidator } = require("../../validators");

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    cnic: {
      type: String,
    },
    contact_no: {
      type: String,
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
    password: {
      type: String,
      required: true,
      max: 1024,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    verification: {
      type: Schema.Types.ObjectId,
      ref: "Verification",
    },
    image:{
      type:String,
      default:null,
    }
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("User", userSchema);
