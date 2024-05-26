const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "Buyer",
    },
    plot: {
      type: Schema.Types.ObjectId,
      ref: "Plot",
    },
    flat: {
      type: Schema.Types.ObjectId,
      ref: "flat",
    },
    transaction_hash: {
      type: String,
    },
    blockId: {
      type: Number,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    is_constructed: {
      type: Boolean,
      default: true,
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["Bank Transfer", "Cash"],
      default: "Cash",
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
