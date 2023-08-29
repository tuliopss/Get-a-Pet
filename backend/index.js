const express = require("express");
const cors = require("cors");
const multer = require("multer");

const UserRoutes = require("./routes/UserRoutes");
const PetRoutes = require("./routes/PetRoutes");

const app = express();

app.use(express.json());

//Cors
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.static("public"));

//Routes
app.use("/users", UserRoutes);
app.use("/pets", PetRoutes);

app.listen(5000);
