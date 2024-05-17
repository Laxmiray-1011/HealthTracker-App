const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse ,postData} = require("@utils/response.config");
const { isEmpty,isArray, getFileAbsulatePath, defaultProfileImage } = require("@helpers/helper");
const { PrescriptionCollection } = require("@resources/patient/PrescriptionCollection");
const {  TestreportCollection } = require("@resources/patient/TestreportCollection");
const {  PatientdetailsCollection } = require("@resources/patient/PatientdetailsCollection");
const { base64FileUpload,removeFile,filterFilesFromRemove } = require("@helpers/upload");
const { getPaginationOptions, returnPaginated } = require('@helpers/paginator')
const db = require("@models");
const { Op } = require("sequelize");
const UserModel = db.users;
const PrescriptionsModel = db.Prescriptions;
const TestreportModel = db.test_reports;
const PatientdetailsModel = db.patient_details;
const bcrypt = require("bcryptjs");
const moment = require("moment");



// /**
//  * get patient_details
//  * @param {*} req 
//  * @param {*} res 
//  */
exports.index = async (req, res) => {
    let { page, size, weight,date} = req.query;
    let condition = {user_id: req.userId}
    if(!isEmpty(date)){
      condition.date = { [Op.like]: `%${date}%` } 
    }
    // if(!isEmpty(weight)){
    //   condition.weight = weight
   // }
    const paginatorOptions = getPaginationOptions(page, size);
    PatientdetailsModel.findAndCountAll({
          where: condition,
          order:[['id', 'DESC']],
          include: [
            {
              model: UserModel,
              as: 'user'
            }
          ],
          offset: paginatorOptions.offset,
          limit: paginatorOptions.limit
        }).then( (data) => {
          let result = {
              items: PatientdetailsCollection(data.rows),
              total: data.count,
            }
          res.send(formatResponse(result, 'All Patients data'));
        })
        .catch(err => {
         console.log(err)
          res.status(errorCodes.default).send(formatErrorResponse(err));
        });
  
  }
  /**
   * get patient_details 
   * @param {*} req 
   * @param {*} res 
   */
  exports.store = async (req, res) => {
    let data = req.body;
    let obj = {
      user_id: req.userId,
      weight: data.weight || "",
      date: moment(data.date,"YYYY-MM-DD"),
     
    } 
    // let images = [];
    // if(isArray(data.images)){
    //   for(let i=0 ;i<data.images.length;i++){
    //     let result = base64FileUpload(data.images[i], "Test_report");
    //     if (result) {
    //       images.push(result);
    //     }
    //   }
    //   obj.images = images
    // }
  
  
    let patient_details = await PatientdetailsModel.create(obj);
    if (!patient_details) {
      return res.status(errorCodes.default).send(formatErrorResponse("Patient's data does not created due to some error"));
    }
  
    res.send(formatResponse({}, "Patient's datas store successfully"));
  
  }
  /**
   * get patient_details
   * @param {*} req 
   * @param {*} res 
   */
  exports.edit = async (req, res) => {
      let patient_details = await PatientdetailsModel.findOne({ 
          order:[["id","DESC"]],
          include: [
            {
              model: UserModel,
              as: 'user'
            }
          ],
          where: { id: req.params.id }
       });
        if (!patient_details) {
          return res.status(errorCodes.default).send(formatErrorResponse('No data found'));
        }
      
        res.send(formatResponse(PatientdetailsCollection(patient_details), "get successfully details"));
  
  }
  
  /**
   * Edit patient_details
   * 
   * @param {*} req 
   * @param {*} res 
   */
  exports.update = async (req, res) => {
    let data = req.body;
    
    let postData = {
      weight: data.weight,
      date: data.date,
    } 
    /*let images = [];
    if(isArray(data.images)){
      for(let i=0 ;i<data.images.length;i++){
        let result = base64FileUpload(data.images[i], "prescriptions");
        if (result) {
          images.push(result);
        }
      }
      obj.images = images
    }*/
  
    //upload profile image
    
  
    PatientdetailsModel.update(postData, { where: { user_id: req.userId, id : req.params.id} }).then(result => {
      res.send(formatResponse({}, "Patient's Data Updated successfully!"));
    }).catch(error => {
      return res.status(errorCodes.default).send(formatErrorResponse(error));
    });
  };
  
  /**
   * delete patient_details
   * 
   * @param {*} req 
   * @param {*} res 
   */
  exports.delete = async (req, res) => {
    let id = req.params.id;
    let user = await PatientdetailsModel.findOne({ where: { id: id, user_id:req.userId } });
    if (!user) {
      return res.status(errorCodes.default).send(formatErrorResponse("Patient's details not found"));
    }
  
    let patient = await PatientdetailsModel.destroy({ where: { id: id, user_id:req.userId } })
    if(patient){
      res.send(formatResponse({},"Patient's details deleted successfully"));
  
    }
    
  };
  
