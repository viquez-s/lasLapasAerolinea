const { Schema, model } = require("mongoose");
/*  */
const ScheduleSchema = new Schema({
  departure: Date,
  price: Number,
});

const ScheduleModel = model("Schedule", ScheduleSchema);

module.exports = ScheduleModel;
