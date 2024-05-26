const jwt = require("jsonwebtoken");
const { getEndpointError } = require("../utils");

const verifyJwt = (req, res, next) => {
  let passedJwtToken = req.headers.authorization?.split(" ")[1];

  if (!passedJwtToken)
    return res
      .status(401)
      .send(
        getEndpointError("You do not have authorization to access this route")
      );

  jwt.verify(passedJwtToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res
        .status(401)
        .send(getEndpointError(err.message ?? "Your access token is invalid"));

    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyJwt,
};
