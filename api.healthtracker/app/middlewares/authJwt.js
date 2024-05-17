const jwt = require("jsonwebtoken");
const config = require("@config/auth.config.js");
const { errorCodes, formatErrorResponse } = require("@utils/response.config");
const db = require("@models");
const { getRoleId } = require("@library/common");
const UserModel = db.users;

verifyToken = (req, res, next) => {
  const authorizationHeaader = req.headers.authorization;
  if (!authorizationHeaader || (authorizationHeaader.split(' ')).length != 2) {
    return res.status(errorCodes.auth).send(formatErrorResponse(config.messages.tokensMissing));
  }
  let token = authorizationHeaader.split(' ')[1];

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send(formatErrorResponse(config.messages.default));
    }
    req.token = token;
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  });
};

/**
 * Check if user is customer
 */
isPatient = async (req, res, next) => {
  let roleId =  getRoleId("patient");
  if(req.role == roleId){
    next();
    return;
  }
  res.status(403).send({
    message: "Require patient Role!",
  });
 
};



const authJwt = {
  verifyToken,
  isPatient
};

module.exports = authJwt;