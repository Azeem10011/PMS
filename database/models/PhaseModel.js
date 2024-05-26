const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhaseSchema = new Schema(
  {
    society: {
      type: Schema.Types.ObjectId,
      ref: "Society",
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    phase_type: {
      type: String,
      enum: ["commercial", "non-commercial"],
      required: true,
    },
    per_square_price: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0,
        message: "price must be a positive number.",
      },
    },
    total_area: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0,
        message: "Total area must be a positive number.",
      },
    },
    plot_counter_no: {
      type: Number,
      required: true,
      default: 1,
    },
    total_occupy_area: {
      type: Number,
      default: 0,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "PublicPlace",
      default: null,
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "PublicPlace",
      default: null,
    },
    college: {
      type: Schema.Types.ObjectId,
      ref: "PublicPlace",
      default: null,
    },
    university: {
      type: Schema.Types.ObjectId,
      ref: "PublicPlace",
      default: null,
    },
    gym: {
      type: Schema.Types.ObjectId,
      ref: "PublicPlace",
      default: null,
    },
    park: {
      type: Schema.Types.ObjectId,
      ref: "PublicPlace",
      default: null,
    },
    mosque: {
      type: Schema.Types.ObjectId,
      ref: "PublicPlace",
      default: null,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Phase", PhaseSchema);
