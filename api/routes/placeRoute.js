const express = require("express");
const {
  addPlace,
  getPlaceById,
  updatePlaceById,
  getAllPlacesByUser,
  getAllPlaces,
} = require("../controllers/placeController");
const router = express.Router();

router.post("/", addPlace);
router.get("/user-places", getAllPlacesByUser);

router.route("/:id").get(getPlaceById).put(updatePlaceById);

router.get("/", getAllPlaces);

module.exports = router;
