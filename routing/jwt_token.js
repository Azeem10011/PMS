const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY; // Define a secret key for JWT

function createToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, secretKey);
}
module.exports = {
  createToken,
};
