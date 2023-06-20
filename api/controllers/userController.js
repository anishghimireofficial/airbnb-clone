const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register user

const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 12),
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(422).json(error);
  }
};

//Login User

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const passOk = await bcrypt.compare(password, user.password);
      if (passOk) {
        jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, {
                secure: true,
                httpOnly: true,
              })
              .json(user);
          }
        );
      } else {
        return res.json("pass not ok");
      }
    } else {
      res.status(400).json("User not Found!!");
    }
  } catch (error) {
    res.json("Login failed");
  }
};

//Get Profile

exports.getUser = async (req, res) => {
  const { token } = req.cookies;
  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) throw err;
        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    res.json("Something went wrong");
  }
};

//Logout
exports.logoutUser = async (req, res) => {
  res.cookie("token", " ").json(true);
};
