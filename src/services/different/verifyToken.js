const JWT = require("jsonwebtoken");

function verifyToken(authHeader) {
  try {
    if (!authHeader) return res.status(401);

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401);

    const validToken = JWT.verify(token, env.secretKey);

    return validToken;
  } catch (err) {
    return res.status(500);
  }
}

module.exports = { verifyToken };
