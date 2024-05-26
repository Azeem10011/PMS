const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocietySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "SocietyOwner",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    total_area: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0,
        message: "Total area must be a positive number.",
      },
    },
    commercial_area: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0,
        message: "commercial area must be a positive number.",
      },
    },
    non_commercial_area: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0,
        message: "non commercial area must be a positive number.",
      },
    },
    total_occupy_area: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0,
        message: "Total occupy area must be a positive number.",
      },
    },
    total_occupy_commercial_area: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0,
        message: "Total occupy area must be a positive number.",
      },
    },
    total_occupy_non_commercial_area: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0,
        message: "Total occupy area must be a positive number.",
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
    images: {
      type: [String],
      default: [],
    },
    logos: {
      type: [
        {
          size: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
    amount_paid: {
      type: Number,
      required: true,
    },
    tax_applied: {
      type: [Schema.Types.ObjectId],
      ref: "Tax",
      default: [],
      unique: true,
    },
    is_active: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

module.exports = mongoose.model("Society", SocietySchema);
