const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  data: Buffer,
  filename: String,
  path: String,
});

const File = mongoose.model("File", FileSchema);
module.exports = File;
