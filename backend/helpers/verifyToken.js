const jwt = require("jsonwebtoken");
const getToken = require("./getToken");

const checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(201).json({ message: "Acesso negado." });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(201).json({ message: "Acesso negado." });
  }

  try {
    const verified = jwt.verify(token, "nosso_secret_jwt");
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Token inválido." });
  }
};

module.exports = checkToken;
