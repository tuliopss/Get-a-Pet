const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUserByToken = async (token) => {
  if (!token) {
    return res.status(201).json({ message: "Acesso negado." });
  }

  const decoded = jwt.verify(token, "nosso_secret_jwt");

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });
  return user;
};

module.exports = getUserByToken;
