const mongoose = require("mongoose");

const accountschema = new mongoose.Schema({
  name: {
    type: String,
    // unique: true,
    required: true,
    trim: true
  },
  pass: {
    type: String,
    required: true,
  },
});

const account = mongoose.model("account", accountschema);

module.exports = account;
