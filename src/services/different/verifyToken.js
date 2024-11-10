const JWT = require("jsonwebtoken");

function verifyToken(authHeader) {
  try {
    if (!authHeader) {
      console.log("!authHeaders");
      return null;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      console.log("!token");
      return null;
    }

    return JWT.verify(token, env.secretKey);
  } catch (err) {
    return null;
  }
}

module.exports = { verifyToken };
