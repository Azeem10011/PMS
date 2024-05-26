const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublicPlaceSchema = new Schema(
  {
    property_type: {
      type: String,
      enum: [
        "University",
        "School",
        "Mosque",
        "Hospital",
        "Park",
        "Gym",
        "College",
      ],
      required: true,
    },
    phase: {
      type: Schema.Types.ObjectId,
      ref: "Phase",
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    no_of_square_feet: {
      type: Number,
      required: true,
    },
    plot_no: {
      type: Number,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("PublicPlace", PublicPlaceSchema);
