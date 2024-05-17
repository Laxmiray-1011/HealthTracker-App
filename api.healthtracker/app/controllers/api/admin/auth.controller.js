const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse } = require("@utils/response.config");
const { UserCollection } = require("@resources/UserCollection");
const db = require("@models");
const { isEmpty, getFileAbsulatePath, defaultProfileImage } = require("@helpers/helper");
const { getRoleId } = require("../../../library/common");
const UserModel = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * sign in user
 *
 * @param req
 * @param res
 */
exports.signin = async (req, res) => {
  let roleId = getRoleId('admin');
  const user = await UserModel.findOne({
    where: { mobile: req.body.mobile ,role_id:roleId}
  });

  if (!user) {
    return res.status(errorCodes.default).send(formatErrorResponse(config.validationMessages.usernameNotFound));
  }

  var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(errorCodes.default).send(formatErrorResponse(config.validationMessages.passwordError));
  }

  var token = jwt.sign({ id: user.id, role: user.role_id }, config.secret, {
    expiresIn: 86400 * config.login_expire_days
  });


  res.send(formatResponse({
    user: await UserCollection(user),
    access_token: token
  }, "Login successfully!"));


};

/**
 * sign up user
 *
 * @param req
 * @param res
 */
exports.signup = async (req, res) => {
  let data = req.body;
  let roleId = getRoleId('admin');

  const existing_mobile = await UserModel.findOne({ where: { mobile: data.mobile, role_id: roleId } });
  if (existing_mobile) {
    return res.status(errorCodes.default).send(formatErrorResponse('Mobile is already exists.'));
  }

  const postData = {
    name: data.name,
    mobile: data.mobile,
    password: bcrypt.hashSync(data.password, 8),
    role_id: roleId
  };

  UserModel.create(postData).then(async (result) => {
    var token = jwt.sign({ id: result.id, role: result.role_id }, config.secret, {
      expiresIn: 86400 * config.login_expire_days
    });

    res.send(formatResponse({ user: await UserCollection(result), access_token: token }, "Signup successfully!"));
  }).catch(error => {
    return res.status(errorCodes.default).send(formatErrorResponse(errorCodes.defaultErrorMsg));
  });
};

/**
 * Logout
 * 
 * @param req
 * @param res
 */
exports.logout = async (req, res) => {

  res.send(formatResponse("", "Logout successfully!"));
};
