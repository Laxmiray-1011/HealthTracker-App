const { authJwt } = require("@middlewares");
const { signIn, signup, editProfile, changePassword } = require('@utils/validators');
const authController = require('@controllers/api/admin/auth.controller');
const profileController = require('@controllers/api/admin/profile.controller');
const DiseasesController = require('@controllers/api/admin/diseases.controller');
// const prescriptionController = require('@controllers/api/admin/prescription.controller');
// const TestreportController = require('@controllers/api/admin/Testreport.controller');

module.exports = (app, express) => {
    var router = express.Router();

    //auth
    router.post("/auth/signin", [signIn], authController.signin);
    router.post("/auth/signup", [signup], authController.signup);
    router.post("/logout", [authJwt.verifyToken], authController.logout);

    //profile
    
    router.post("/edit-profile", [authJwt.verifyToken, editProfile], profileController.editProfile);
    router.post("/change-password", [authJwt.verifyToken, changePassword], profileController.changePassword);


    //Prescriptions

    // router.get("/prescriptions", [authJwt.verifyToken], prescriptionController.index);
    // router.post("/prescriptions/store", [authJwt.verifyToken], prescriptionController.store);
    // router.get("/prescriptions/edit/:id", [authJwt.verifyToken], prescriptionController.edit);
    // router.post("/prescriptions/update/:id", [authJwt.verifyToken], prescriptionController.update);
    // router.delete("/prescriptions/delete/:id", [authJwt.verifyToken], prescriptionController.delete);

    //Test-Report

    // router.get("/testreport", [authJwt.verifyToken], TestreportController.index);
    // router.post("/testreport/store", [authJwt.verifyToken], TestreportController.store);
    // router.get("/testreport/edit/:id", [authJwt.verifyToken], TestreportController.edit);
    // router.post("/testreport/update/:id", [authJwt.verifyToken], TestreportController.update);
    // router.delete("/testreport/delete/:id", [authJwt.verifyToken], TestreportController.delete);

    //diseases
    router.get("/diseases", [authJwt.verifyToken], DiseasesController.index);
    router.post("/diseases/store", [authJwt.verifyToken], DiseasesController.store);
    router.get("/diseases/edit/:id", [authJwt.verifyToken], DiseasesController.edit);
    router.post("/diseases/update/:id", [authJwt.verifyToken], DiseasesController.update);
    router.delete("/diseases/delete/:id", [authJwt.verifyToken], DiseasesController.delete);


    app.use("/api/admin", router);
};