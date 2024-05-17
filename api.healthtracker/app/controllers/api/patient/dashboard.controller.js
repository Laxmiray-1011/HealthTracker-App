
const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse ,postData} = require("@utils/response.config");
const { isEmpty,isArray, getFileAbsulatePath, defaultProfileImage, appVersion } = require("@helpers/helper");
const { getPaginationOptions, returnPaginated } = require('@helpers/paginator')
const db = require("@models");
const { Op } = require("sequelize");
const UserModel = db.users;
const PrescriptionsModel = db.Prescriptions;
const TestreportModel = db.test_reports;
const PatientdetailsModel = db.patient_details;
const moment = require("moment");
exports.index = async(req, res) => {
    notification_count = 0;
    let data = {
       support_mobile:"+911000000009",
       support_email:"healthtracker@gmail.com",
       notification_count : notification_count,
       app_version: appVersion('patient')
    }
     res.send(formatResponse(data, "Patient deshboard."));
   };