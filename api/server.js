const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("./app");

//Connection to MongoDb Database

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB connection successful.");
  })
  .catch((err) => {
    console.log(err);
  });

// //Server start
const port = 3000;

app.listen(port, () => {
  console.log(`Server is Running on Port:${port}`);
});
