const { authJwt } = require("@middlewares");
const { signIn, signup, editProfile, changePassword } = require('@utils/validators');
const authController = require('@controllers/auth.controller');
const profileController = require('@controllers/profile.controller');

module.exports = (app, express) => {
    var router = express.Router();

    //auth
    router.post("/auth/signin", [signIn], authController.signin);
    router.post("/auth/signup", [signup], authController.signup);
    router.post("/logout", [authJwt.verifyToken], authController.logout);

    //profile
    router.post("/edit-profile", [authJwt.verifyToken, editProfile], profileController.editProfile);
    router.post("/change-password", [authJwt.verifyToken, changePassword], profileController.changePassword);

    app.use("/api", router);
};