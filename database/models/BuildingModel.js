const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// In this model we will first create a building with no flats, But then eventually the flats
// will be added to the building.

const BuildingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    total_no_flats: {
      type: Number,
      required: true,
    },
    total_occupied_flats: {
      type: Number,
      default: 0,
    },
    flats_list: {
      type: [Schema.Types.ObjectId],
      ref: "Flat",
      default: [],
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Building", BuildingSchema);
