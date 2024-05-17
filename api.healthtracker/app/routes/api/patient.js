const { authJwt } = require("@middlewares");
const { signIn, signup, editProfile, changePassword } = require('@utils/validators');
const authController = require('@controllers/api/patient/auth.controller');
const profileController = require('@controllers/api/patient/profile.controller');
const prescriptionController = require('@controllers/api/patient/prescription.controller');
const TestreportController = require('@controllers/api/patient/Testreport.controller');
const PatientdetailsController = require('@controllers/api/patient/Patientdetails.controller');
const dashboardController = require('@controllers/api/patient/dashboard.controller');
const bloodpressureController = require('@controllers/api/patient/bloodpressure.controller');
const SugerController=require('@controllers/api/patient/suger.controller');
const contactusController=require('@controllers/api/patient/contactus.controller');

module.exports = (app, express) => {
  var router = express.Router();

  //contact us
  router.post("/contactus",contactusController.contactus);

  //auth
  router.post("/auth/signin", [signIn], authController.signin);
  router.post("/auth/signup", [signup], authController.signup);
  router.post("/logout", [authJwt.verifyToken, authJwt.isPatient], authController.logout);

  //profile

  router.post("/edit-profile", [authJwt.verifyToken, authJwt.isPatient, editProfile], profileController.editProfile);
  router.post("/change-password", [authJwt.verifyToken, authJwt.isPatient, changePassword], profileController.changePassword);

  router.get("/dashboard", [authJwt.verifyToken, authJwt.isPatient], dashboardController.index);



  //Prescriptions

  router.get("/prescriptions", [authJwt.verifyToken, authJwt.isPatient], prescriptionController.index);
  router.post("/prescriptions/store", [authJwt.verifyToken, authJwt.isPatient], prescriptionController.store);
  router.get("/prescriptions/edit/:id", [authJwt.verifyToken, authJwt.isPatient], prescriptionController.edit);
  router.post("/prescriptions/update/:id", [authJwt.verifyToken, authJwt.isPatient], prescriptionController.update);
  router.delete("/prescriptions/delete/:id", [authJwt.verifyToken, authJwt.isPatient], prescriptionController.delete);

  //Test-Report

  router.get("/testreport", [authJwt.verifyToken, authJwt.isPatient], TestreportController.index);
  router.post("/testreport/store", [authJwt.verifyToken, authJwt.isPatient], TestreportController.store);
  router.get("/testreport/edit/:id", [authJwt.verifyToken, authJwt.isPatient], TestreportController.edit);
  router.post("/testreport/update/:id", [authJwt.verifyToken, authJwt.isPatient], TestreportController.update);
  router.delete("/testreport/delete/:id", [authJwt.verifyToken, authJwt.isPatient], TestreportController.delete);

  //Patient_details 
  router.get("/patientdetails", [authJwt.verifyToken, authJwt.isPatient], PatientdetailsController.index);
  router.post("/patientdetails/store", [authJwt.verifyToken, authJwt.isPatient], PatientdetailsController.store);
  router.get("/patientdetails/edit/:id", [authJwt.verifyToken, authJwt.isPatient], PatientdetailsController.edit);
  router.post("/patientdetails/update/:id", [authJwt.verifyToken, authJwt.isPatient], PatientdetailsController.update);
  router.delete("/patientdetails/delete/:id", [authJwt.verifyToken, authJwt.isPatient], PatientdetailsController.delete);

  //bloodpressure 
  router.get("/bloodpressure", [authJwt.verifyToken, authJwt.isPatient], bloodpressureController.index);
  router.post("/bloodpressure/store", [authJwt.verifyToken, authJwt.isPatient], bloodpressureController.store);
  router.get("/bloodpressure/edit/:id", [authJwt.verifyToken, authJwt.isPatient], bloodpressureController.edit);
  router.post("/bloodpressure/update/:id", [authJwt.verifyToken, authJwt.isPatient], bloodpressureController.update);
  router.delete("/bloodpressure/delete/:id", [authJwt.verifyToken, authJwt.isPatient], bloodpressureController.delete);

  //suger 
  router.get("/suger", [authJwt.verifyToken, authJwt.isPatient], SugerController.index);
  router.post("/suger/store", [authJwt.verifyToken, authJwt.isPatient], SugerController.store);
  router.get("/suger/edit/:id", [authJwt.verifyToken, authJwt.isPatient], SugerController.edit);
  router.post("/suger/update/:id", [authJwt.verifyToken, authJwt.isPatient], SugerController.update);
  router.delete("/suger/delete/:id", [authJwt.verifyToken, authJwt.isPatient], SugerController.delete);


  app.use("/api/patient", router);
};