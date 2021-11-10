const { Schema, model } = require("mongoose");

const PlaneSchema = new Schema(
  {
    capacity: Number,
    rows: Number,
    year: String,
    model: String,
    brand: String,
    row_type: {
      type: Number,
      default: 6,
      enum: [6, 9],
    },
  },
  { timestamps: true }
);

const AvionModel = model("Plane", PlaneSchema);

module.exports = AvionModel;
