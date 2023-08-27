const Pet = require("../models/Pet");
// const ObjectId = require("mongoose").Types.ObjectId;
const getToken = require("../helpers/getToken");
const getUserByToken = require("../helpers/getUserByToken");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = class PetController {
  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    const images = req.files;

    const available = true;

    //images upload

    //validations
    if (!name) {
      res.status(422).json({ message: "O nome do pet é obrigatório." });
      return;
    }
    if (!age) {
      res.status(422).json({ message: "A idade do pet é obrigatória." });
      return;
    }
    if (!weight) {
      res.status(422).json({ message: "O peso do pet é obrigatório." });
      return;
    }

    if (!color) {
      res.status(422).json({ message: "A cor do pet é obrigatória." });
      return;
    }
    if (images.length === 0) {
      res
        .status(422)
        .json({ message: "A(s) imagem(ns) do pet é obrigatória." });
      return;
    }

    //get pet owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available,
      images: [],
      user: {
        id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    images.map((image) => {
      pet.images.push(image.filename);
    });

    try {
      const newPet = await pet.save();
      res.status(201).json({ message: "Pet cadastrado com sucesso", newPet });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getAll(req, res) {
    const pets = await Pet.find().sort("createdAt");

    res.status(200).json({ pets: pets });
  }

  static async getAllUserPets(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "user.id": user._id }).sort("-createdAt");
    res.status(200).json({ pets });
  }

  static async getAlUserAdoptions(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");
    res.status(200).json({ pets });
  }

  static async getPetById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado." });
    }

    res.status(200).json({ pet: pet });
  }

  static async removePetById(req, res) {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado." });
      return;
    }

    //check if user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user.id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema em processar sua solicitação!" });
      return;
    }

    await Pet.findByIdAndRemove(id);

    res.status(200).json({ message: "Pet removido com sucesso!" });
  }

  static async updatePet(req, res) {
    const id = req.params.id;
    const { name, age, weight, color, available } = req.body;

    const images = req.files;

    const updatedData = {};

    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado." });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user.id.toString() !== user._id.toString()) {
      res
        .status(422)
        .json({ message: "Houve um problema em processar sua solicitação!" });
      return;
    }

    if (!name) {
      res.status(422).json({ message: "O nome do pet é obrigatório." });
      return;
    } else {
      updatedData.name = name;
    }

    if (!age) {
      res.status(422).json({ message: "A idade do pet é obrigatória." });
      return;
    } else {
      updatedData.age = age;
    }
    if (!weight) {
      res.status(422).json({ message: "O peso do pet é obrigatório." });
      return;
    } else {
      updatedData.weight = weight;
    }

    if (!color) {
      res.status(422).json({ message: "A cor do pet é obrigatória." });
      return;
    } else {
      updatedData.color = color;
    }

    if (images.length === 0) {
      res
        .status(422)
        .json({ message: "A(s) imagem(ns) do pet é obrigatória." });
      return;
    } else {
      updatedData.images = [];
      images.map((image) => {
        updatedData.images.push(image.filename);
      });
    }

    await Pet.findByIdAndUpdate(id, updatedData);

    res.status(200).json({ message: "Pet atualizado com sucesso!" });
  }

  static async schedule(req, res) {
    const id = req.params.id;

    //id validatins to find a pet
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID inválido" });
      return;
    }

    const pet = await Pet.findOne({ _id: id });
    if (!pet) {
      res.status(404).json({ message: "Pet não encontrado." });
      return;
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user.id.equals(user._id)) {
      res.status(422).json({
        message: "Você não pode agendar uma visita com seu próprio pet.",
      });
      return;
    }

    //check if user has already scheduled a visit
    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: "Você já agendou uma visita para esse pet.",
        });
        return;
      }
    }

    //add user to pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    };

    await Pet.findByIdAndUpdate(id, pet);
    res
      .status(200)
      .json({
        message: `A visita foi agendada com sucesso. Entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`,
      });
  }
};
