const Booking = require("../models/bookingModel");
const jwt = require("jsonwebtoken");

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET,
      {},
      async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      }
    );
  });
}

exports.booking = async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, cheakIn, cheakOut, numberOfGuest, name, mobile, price } =
    req.body;

  try {
    const booking = await Booking.create({
      place,
      cheakIn,
      cheakOut,
      numberOfGuest,
      name,
      mobile,
      price,
      user: userData.id,
    });

    res.status(200).json(booking);
  } catch (error) {
    res.json(error);
  }
};

exports.getBookingByUser = async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate("place"));
  } catch (error) {
    res.json(error);
  }
};
