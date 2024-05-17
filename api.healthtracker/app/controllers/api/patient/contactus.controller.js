const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse ,postData} = require("@utils/response.config");
const { isEmpty,isArray, getFileAbsulatePath, defaultProfileImage } = require("@helpers/helper");
const {contactusCollection} =require("@resources/patient/contactusCollection");
const { base64FileUpload,removeFile,filterFilesFromRemove } = require("@helpers/upload");
const { getPaginationOptions, returnPaginated } = require('@helpers/paginator')
const db = require("@models");
const { Op } = require("sequelize");
const contactusModel = db.Contactus;


/**
   * Submit Query 
   * @param {*} req 
   * @param {*} res 
   */
exports.contactus = async (req, res) => {
    let data = req.body;
    let obj = {
      name: data.name || "",
      email: data.email || "",
      mobile: data.mobile || "",
      questions: data.questions || "",
      status: data.status || "Active",
    } 
    
    let contact = await contactusModel.create(obj);
    if (!contact) {
      return res.status(errorCodes.default).send(formatErrorResponse('Query not submitted due to some error'));
    }
    res.send(formatResponse({}, "Query Submitted Successfully"));
  
  }