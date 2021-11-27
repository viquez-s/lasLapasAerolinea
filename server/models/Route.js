const { Schema, model } = require("mongoose");
/*  */
const RouteSchema = new Schema({
  discountAmount: Number,
  duration: String,
  name: String,
  schedules: [{ type: Schema.Types.ObjectId, ref: "Schedule" }],
});

const RouteModel = model("Route", RouteSchema);

module.exports = RouteModel;
