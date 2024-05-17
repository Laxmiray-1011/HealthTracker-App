const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse ,postData} = require("@utils/response.config");
const { isEmpty,isArray, getFileAbsulatePath, defaultProfileImage } = require("@helpers/helper");
const { PrescriptionCollection } = require("@resources/patient/PrescriptionCollection");
const {  TestreportCollection } = require("@resources/patient/TestreportCollection");
const {BloodpressureCollection} =require("@resources/patient/bloodpressureCollection");
const { base64FileUpload,removeFile,filterFilesFromRemove } = require("@helpers/upload");
const { getPaginationOptions, returnPaginated } = require('@helpers/paginator')
const db = require("@models");
const { Op } = require("sequelize");
const UserModel = db.users;
const BloodpressureModel = db.blood_pressure;
const moment = require("moment");





// /**
//  * get Bloodpressure
//  * @param {*} req 
//  * @param {*} res 
//  */
exports.index = async (req, res) => {
    let { page, size,date} = req.query;
    let condition = {user_id: req.userId}
    if(!isEmpty(date)){
      condition.date ={ [Op.like]: `%${date}%` } 
    }
    
    const paginatorOptions = getPaginationOptions(page, size);
    BloodpressureModel.findAndCountAll({
          where: condition,
          order:[['id', 'DESC']],
          include: [
            {
              model: UserModel,
              as: 'user'
            },
          ],
          offset: paginatorOptions.offset,
          limit: paginatorOptions.limit
        }).then( (data) => {
          let result = {
              items: BloodpressureCollection(data.rows),
              total: data.count,
            }
          res.send(formatResponse(result, 'All Bloodpressure data'));
        })
        .catch(err => {
         console.log(err)
          res.status(errorCodes.default).send(formatErrorResponse(err));
        });
  
  }
  /**
   * get Bloodpressure 
   * @param {*} req 
   * @param {*} res 
   */
  exports.store = async (req, res) => {
    let data = req.body;
    let obj = {
      user_id: req.userId,
      high: data.high || "",
      low: data.low || "",
      date : moment(data.date,"YYYY-MM-DD"),
    } 
    

    let bloodpressure = await BloodpressureModel.create(obj);
    if (!bloodpressure) {
      return res.status(errorCodes.default).send(formatErrorResponse('Bloodpressure level does not created due to some error'));
    }
  
    res.send(formatResponse({}, "Bloodpressure level store successfully"));
  
  }
  /**
   * get Bloodpressure
   * @param {*} req 
   * @param {*} res 
   */
  exports.edit = async (req, res) => {
      let bloodpressure = await BloodpressureModel.findOne({ 
          order:[["id","DESC"]],
          include: [
            {
              model: UserModel,
              as: 'user'
            },
          ],
          where: { id: req.params.id }
       });
        if (!bloodpressure) {
          return res.status(errorCodes.default).send(formatErrorResponse('No data found'));
        }
      
        res.send(formatResponse(BloodpressureCollection(bloodpressure), "get successfully details"));
  
  }
  
  /**
   * Edit Bloodpressure
   * 
   * @param {*} req 
   * @param {*} res 
   */
  exports.update = async (req, res) => {
    let data = req.body;
    
    let postData = {
      high: data.high || "",
      low: data.low || "",
      date : moment(data.date,"YYYY-MM-DD"),
    } 
    
    BloodpressureModel.update(postData, { where: { user_id: req.userId, id : req.params.id} }).then(result => {
      res.send(formatResponse({}, "Bloodpressure Data Updated successfully!"));
    }).catch(error => {
      return res.status(errorCodes.default).send(formatErrorResponse(error));
    });
  };
  
  /**
   * delete Bloodpressure
   * 
   * @param {*} req 
   * @param {*} res 
   */
  exports.delete = async (req, res) => {
    let id = req.params.id;
    let user = await BloodpressureModel.findOne({ where: { id: id, user_id:req.userId } });
    if (!user) {
      return res.status(errorCodes.default).send(formatErrorResponse('Bloodpressure level not found'));
    }
  
    let blood_pressure = await BloodpressureModel.destroy({ where: { id: id, user_id:req.userId } })
    if(blood_pressure){
      res.send(formatResponse({},"Bloodpressure data deleted successfully"));
  
    }
    
  };
  
