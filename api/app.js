const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const imageDownload = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const app = express();

//importing Routes
const userRoutes = require("./routes/userRoutes");
const placeRoutes = require("./routes/placeRoute");
const bookingRoutes = require("./routes/bookingRoute");

//Middleware
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.json());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/bookings", bookingRoutes);

app.post("/api/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;

    const newName = "photo" + Date.now() + ".jpg";
    await imageDownload.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });

    res.json(newName);
  } catch (error) {
    res.json("error");
  }
});

const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.array("photos", 10), async (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }

  res.json(uploadedFiles);
});

module.exports = app;
