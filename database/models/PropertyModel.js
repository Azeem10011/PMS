const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is our property which can be a house or a shop. This will be in a plot.

const PropertySchema = new Schema(
  {
    no_of_rooms: {
      type: Number,
      default: null,
    },
    no_of_floors: {
      type: Number,
      default: null,
    },
    property_type: {
      type: String,
      // enum: ["Shop", "House"],
      required: true,
    },
    property_style: {
      type: String,
      enum: ["Custom", "Roman", "German", "Turkish"],
      default: "Custom",
    },
    available_for_rent: {
      type: Boolean,
      default: true,
      required: true,
    },
    on_rent: {
      type: Boolean,
      default: false,
      required: true,
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
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Property", PropertySchema);
