const { Schema, model } = require("mongoose");
/*  */
const FleetSchema = new Schema({
  name: String,
  planes: [{ type: Schema.Types.ObjectId, ref: "Plane" }],
  routes: [{ type: Schema.Types.ObjectId, ref: "Route" }],
});

const FleetModel = model("Route", FleetSchema);

module.exports = FleetModel;
