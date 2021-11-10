const { Schema, model } = require("mongoose");
/*  */
const TicketSchema = new Schema({
  type_id: Number,
  departure: String,
  arrival: String,
  date: Date,
  fleet: [{ type: Schema.Types.ObjectId, ref: "Fleet" }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const TicketModel = model("Route", TicketSchema);

module.exports = TicketModel;
