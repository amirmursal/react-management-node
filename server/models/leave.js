const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
  appliedDate: Date,
  reuestedLeaveDays: Number,
  reason: String,
  startDate: Date,
  endDate: Date,
  userId: String,
  name: String,
  approved: Boolean,
  rejected: Boolean
});

const Leave = mongoose.model("Leave", LeaveSchema);
module.exports = Leave;
