const { Schema, model } = require("mongoose");
/*  */
const FleetSchema = new Schema({
  name: String,
  type: String,
  planes: [{ type: Schema.Types.ObjectId, ref: "Plane" }],
  routes: [{ type: Schema.Types.ObjectId, ref: "Route" }],
});

const FleetModel = model("Fleet", FleetSchema);

module.exports = FleetModel;
