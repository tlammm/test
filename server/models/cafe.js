let mongoose = require("mongoose");

let cafeSchema = mongoose.Schema({
  name: String,
  address: String,
  description: String,
  created: { type: Date, default: Date.now },
});

let Cafe = mongoose.model('cafes', cafeSchema);

module.exports = Cafe;
