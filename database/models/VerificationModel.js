const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const verificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    passwordResetToken: {
      type: Number,
    },
    passwordResetTokenExpiresAt: {
      type: String,
    },
    tokenVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Verification", verificationSchema);
