const express = require("express");
const {
  booking,
  getBookingByUser,
} = require("../controllers/bookingController");
const router = express.Router();

router.post("/", booking);
router.get("/", getBookingByUser);
module.exports = router;
