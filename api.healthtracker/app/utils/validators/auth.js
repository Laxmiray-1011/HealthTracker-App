const validator = require('@helpers/validate');
const { errorCodes, formatValidationResponse } = require("@utils/response.config");


/**
 * Validate signIn
 *
 * @param req
 * @param res
 * @param next
 */
const signIn = (req, res, next) => {
  const validationRule = {
    "mobile": "required|string|max:255",
    "password": "required|string|max:255"
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(errorCodes.default).send(formatValidationResponse(err));
    } else {
      next();
    }
  });
}

/**
 * Validate Signup
 *
 * @param req
 * @param res
 * @param next
 */
const signup = (req, res, next) => {
  const validationRule = {
    "name": "required|string|max:255",
    "password": "required|string|min:6|max:255",
    "mobile": "required|string|min:10|max:10",
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(errorCodes.default).send(formatValidationResponse(err));
    } else {
      next();
    }
  });
}


module.exports = {
  signIn,
  signup
}