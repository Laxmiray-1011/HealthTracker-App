module.exports = {
    secret: "lexx-secret-key",

    login_expire_days: 365,

    validationMessages: {
        usernameNotFound: 'User Not Found.',
        mobileNotFound: 'Error: Mobile Not Found.',
        emailNotFound: 'Invalid login credentials.',
        passwordError: 'Error: Incorrect Password.',
        otpNotMatch: 'OTP does not match.',
        confirmPwdNotMatch: 'New password and confirm password must be same'
    },

    messages: {
        tokensMissing: "Authorization Required!",
        adminAccess: "The action is beyond your pay-grade!",
        cutomserAccess: "Unauthorized Access!",
        default: "Unauthorized Access!",
    }
};