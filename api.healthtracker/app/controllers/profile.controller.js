const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse } = require("@utils/response.config");
const { isEmpty, getFileAbsulatePath, defaultProfileImage } = require("@helpers/helper");
const { base64FileUpload, removeFile } = require("@helpers/upload");
const {UserCollection} = require("@resources/UserCollection");
const db = require("@models");
const { Op } = require("sequelize");
const UserModel = db.users;
const bcrypt = require("bcryptjs");

/**
 * View Profile
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.viewProfile = async (req, res) => {
  let user = await UserModel.findOne({ where: { id: req.userId } });
  if (!user) {
    return res.status(errorCodes.default).send(formatErrorResponse('User not found'));
  }

  res.send(formatResponse(await UserCollection(user)));

}

/**
 * Edit Profile
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.editProfile = async (req, res) => {
  let data = req.body;
  let roleId = req.role;
  let user = await UserModel.findOne({ where: { id: req.userId } });
  if (!user) {
    return res.status(errorCodes.default).send(formatErrorResponse('User not found'));
  }
  
  const existing_mobile = await UserModel.findOne({where: { mobile: data.mobile, id: {[Op.ne]: req.userId }, role_id: roleId } });
  if (existing_mobile) {
    return res.status(errorCodes.default).send(formatErrorResponse('Mobile already exists.'));
  }

  //upload profile image
  let profile_image = user.profile_image;
  if('profile_image' in data && !isEmpty(data.profile_image)){
    //remove old
    removeFile(user.profile_image);

    //upload new
    let result = base64FileUpload(data.profile_image, 'users');
    if(result){
      profile_image = result.path;
    }
  }

  let postData = {
    name: data.name,
    email: data.email,
    mobile: data.mobile,
    profile_image: profile_image
  };

  UserModel.update(postData, { where: { id: req.userId} }).then(result => {
    res.send(formatResponse({
      image_url: (!isEmpty(profile_image)) ? getFileAbsulatePath(profile_image) : defaultProfileImage(),
    }, "Updated successfully!"));
  }).catch(error => {
    return res.status(errorCodes.default).send(formatErrorResponse());
  });
};

/**
 * Change Password
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.changePassword = async (req, res) => {
  let data = req.body;
  let user = await UserModel.findOne({ where: { id: req.userId } });
  if (!user) {
    return res.status(errorCodes.default).send(formatErrorResponse('User not found'));
  }

  var passwordIsValid = bcrypt.compareSync(
    data.old_password,
    user.password
  );

  if (! passwordIsValid) {
    return res.status(errorCodes.default).send(formatErrorResponse("Current password does not matched."));
  }

  if(data.new_password != data.confirm_password){
    return res.status(errorCodes.default).send(formatErrorResponse(config.validationMessages.confirmPwdNotMatch));
  }

  const postData = {
    password: bcrypt.hashSync(data.new_password, 8),
  };  

  UserModel.update(postData, { where: { id: req.userId} }).then(result => {
    res.send(formatResponse("", "Password updated successfully!"));
  }).catch(error => {
    return res.status(errorCodes.default).send(formatErrorResponse());
  });
};

