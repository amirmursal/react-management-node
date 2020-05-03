const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FileSchema = new Schema({
  file: {
    data: Buffer,
  },
});

const File = mongoose.model("File", FileSchema);
module.exports = File;
