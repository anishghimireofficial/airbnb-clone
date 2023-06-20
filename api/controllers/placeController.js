const Place = require("../models/placemodel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//Add New Place
exports.addPlace = async (req, res) => {
  //
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    cheakIn,
    cheakOut,
    maxGuest,
    price,
  } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const newPlace = await Place.create({
        owner: userData.id,
        title,
        address,
        photo: addedPhotos,
        description,
        perks,
        extraInfo,
        cheakIn,
        cheakOut,
        maxGuest,
        price,
      });

      res.status(201).json(newPlace);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//Get all Places by User ID
exports.getAllPlacesByUser = (req, res) => {
  const { token } = req.cookies;
  try {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      const places = await Place.find({ owner: id });
      res.status(201).json(places);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//get places id  specifies user

exports.getPlaceById = async (req, res) => {
  const { id } = req.params;
  try {
    const place = await Place.findById(id);
    res.status(200).json(place);
  } catch (error) {
    res.status(400).json(error);
  }
};

//Update Places by id

exports.updatePlaceById = async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    cheakIn,
    cheakOut,
    maxGuest,
    price,
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photo: addedPhotos,
        description,
        perks,
        extraInfo,
        cheakIn,
        cheakOut,
        maxGuest,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
};

//get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();

    res.status(200).json(places);
  } catch (error) {
    res.status(400).json(error);
  }
};
