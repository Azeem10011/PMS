const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlatSchema = new Schema(
  {
    flat_sold_counter: {
      type: Number,
      default: 1,
      required: true,
    },
    flat_no: {
      type: Number,
      required: true,
    },
    no_of_square_feet: {
      type: Number,
      required: true,
    },
    taxes: {
      type: [Schema.Types.ObjectId],
      ref: "Tax",
      default: [],
    },
    is_approved: {
      type: Boolean,
      default: false,
      required: true,
    },
    is_seen: {
      type: Boolean,
      default: false,
      required: true,
    },
    on_rent: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Flat", FlatSchema);
