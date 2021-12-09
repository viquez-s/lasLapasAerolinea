const { Schema, model } = require("mongoose");
/*  */
const TicketSchema = new Schema({
  date: Date,
  seats: Number,
  price: Number,
  fleet: [{ type: Schema.Types.ObjectId, ref: "Fleet" }],
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const TicketModel = model("Route", TicketSchema);

module.exports = TicketModel;
