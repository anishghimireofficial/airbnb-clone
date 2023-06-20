const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Place",
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  numberOfGuest: { type: Number, required: true },
  cheakIn: { type: Date, required: true },
  cheakOut: { type: Date, required: true },
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  price: { type: Number, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
