const db = require("@models");
const { signIn, signup } = require("./auth");
const { editProfile, changePassword } = require("./profile");


/**
 * Finally export all validations
 */
module.exports = {
    signIn,
    signup,
    editProfile,
    changePassword
}