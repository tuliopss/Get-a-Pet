const express = require("express");
const router = express.Router();

const PetController = require("../controllers/PetController");

//middlewares
const verifyToken = require("../helpers/verifyToken");

const { imageUpload } = require("../helpers/imageUpload");

router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  PetController.create
);

router.get("/", PetController.getAll);
router.get("/mypets", verifyToken, PetController.getAllUserPets);

module.exports = router;
