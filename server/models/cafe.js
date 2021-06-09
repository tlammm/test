let mongoose = require("mongoose");

let cafeSchema = mongoose.Schema({
  name: String,
  address: String,
  addressCity: String,
  addressDistrcit: String,
  description: String,
  capability: Number,
  url: String,
  created: { type: Date, default: Date.now },
});

let Cafe = mongoose.model('cafes', cafeSchema);

module.exports = Cafe;
