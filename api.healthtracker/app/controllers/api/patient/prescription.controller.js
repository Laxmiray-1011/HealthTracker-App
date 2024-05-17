const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse } = require("@utils/response.config");
const { isEmpty,isArray, getFileAbsulatePath, defaultProfileImage } = require("@helpers/helper");
const { PrescriptionCollection } = require("@resources/patient/PrescriptionCollection");
const { base64FileUpload,removeFile,filterFilesFromRemove } = require("@helpers/upload");
const { getPaginationOptions, returnPaginated } = require('@helpers/paginator')
const db = require("@models");
const { Op } = require("sequelize");
const UserModel = db.users;
const PrescriptionsModel = db.Prescriptions;
const bcrypt = require("bcryptjs");
const moment = require("moment");


/**
 * get prescriptions
 * @param {*} req 
 * @param {*} res 
 */
exports.index = async (req, res) => {
  let { page, size, dr_name, place, dr_visit_date} = req.query;
  let condition = {user_id: req.userId}
  if(!isEmpty(dr_name)){
    condition.dr_name = { [Op.like]: `%${dr_name}%` } 
  }
  if(!isEmpty(place)){
    condition.place = { [Op.like]: `%${place}%` }  
  }
  const paginatorOptions = getPaginationOptions(page, size);
  PrescriptionsModel.findAndCountAll({
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
            items: PrescriptionCollection(data.rows),
            total: data.count,
          }
        res.send(formatResponse(result, 'All prescription'));
      })
      .catch(err => {
       console.log(err)
        res.status(errorCodes.default).send(formatErrorResponse(err));
      });

}
/**
 * get prescriptions
 * @param {*} req 
 * @param {*} res 
 */
exports.store = async (req, res) => {
  let data = req.body;
  let obj = {
    user_id: req.userId,
    dr_name: data.dr_name || "",
    place: data.place || "",
    description: data.description || "",
    dr_visit_date : moment(data.dr_visit_date,"YYYY-MM-DD"),
  } 
  let images = [];
  if(isArray(data.images)){
    for(let i=0 ;i<data.images.length;i++){
      let result = base64FileUpload(data.images[i], "prescriptions");
      if (result) {
        images.push(result);
      }
    }
    obj.images = images
  }


  let prescription = await PrescriptionsModel.create(obj);
  if (!prescription) {
    return res.status(errorCodes.default).send(formatErrorResponse('User not found'));
  }

  res.send(formatResponse({}, "Prescription store successfully"));

}
/**
 * get prescriptions
 * @param {*} req 
 * @param {*} res 
 */
exports.edit = async (req, res) => {
    let prescription = await PrescriptionsModel.findOne({ 
        order:[["id","DESC"]],
        include: [
          {
            model: UserModel,
            as: 'user'
          }
        ],
        where: { id: req.params.id }
     });
      if (!prescription) {
        return res.status(errorCodes.default).send(formatErrorResponse('No data found'));
      }
    
      res.send(formatResponse(PrescriptionCollection(prescription), "get successfully details"));

}

/**
 * Edit prescriptions
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.update = async (req, res) => {
  let data = req.body;
  
  let postData = {
    dr_name: data.dr_name,
    place: data.place,
    description: data.description,
    dr_visit_date : moment(data.dr_visit_date,"YYYY-MM-DD"),
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
  

  PrescriptionsModel.update(postData, { where: { user_id: req.userId, id : req.params.id} }).then(result => {
    res.send(formatResponse({}, "Updated successfully!"));
  }).catch(error => {
    return res.status(errorCodes.default).send(formatErrorResponse(error));
  });
};

/**
 * delete prescriptions
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = async (req, res) => {
  let id = req.params.id;
  let user = await PrescriptionsModel.findOne({ where: { id: id, user_id:req.userId } });
  if (!user) {
    return res.status(errorCodes.default).send(formatErrorResponse('Prescriptions not found'));
  }

  let t = await PrescriptionsModel.destroy({ where: { id: id, user_id:req.userId } })
  if(t){
    res.send(formatResponse({},"Prescriptions deleted successfully"));

  }
  
};

