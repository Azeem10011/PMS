const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is the plot in this model we can have either property which will be a house or a shop
// or a building in which we will have flats only one can be there at a time.
// Transactions list will represent how many times this plot was sold and from whom to whom.

const PlotSchema = new Schema(
  {
    phase: {
      type: Schema.Types.ObjectId,
      ref: "Phase",
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },
    building: {
      type: Schema.Types.ObjectId,
      ref: "Building",
      default: null,
    },
    transactions: {
      type: [Schema.Types.ObjectId],
      ref: "Transaction",
      default: [],
    },
    plot_sold_counter: {
      type: Number,
      default: 1,
      required: true,
    },
    plot_no: {
      type: String,
      unique: true,
    },
    no_of_square_feet: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    taxes: {
      type: [Schema.Types.ObjectId],
      ref: "Tax",
      default: [],
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Plot", PlotSchema);
