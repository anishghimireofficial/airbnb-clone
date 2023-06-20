const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  title: String,
  address: String,
  photo: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  cheakIn: Number,
  cheakOut: Number,
  maxGuest: Number,
  price: Number,
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
