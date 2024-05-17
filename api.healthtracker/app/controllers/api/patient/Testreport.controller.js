const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse ,postData} = require("@utils/response.config");
const { isEmpty,isArray, getFileAbsulatePath, defaultProfileImage } = require("@helpers/helper");
const { PrescriptionCollection } = require("@resources/patient/PrescriptionCollection");
const {  TestreportCollection } = require("@resources/patient/TestreportCollection");
const { base64FileUpload,removeFile,filterFilesFromRemove } = require("@helpers/upload");
const { getPaginationOptions, returnPaginated } = require('@helpers/paginator')
const db = require("@models");
const { Op } = require("sequelize");
const UserModel = db.users;
const PrescriptionsModel = db.Prescriptions;
const TestreportModel = db.test_reports;
const bcrypt = require("bcryptjs");



// /**
//  * get prescriptions
//  * @param {*} req 
//  * @param {*} res 
//  */
exports.index = async (req, res) => {
    let { page, size, title,prescription_id} = req.query;
    let condition = {user_id: req.userId}
    if(!isEmpty(prescription_id)){
      condition.prescription_id = { [Op.like]: `%${prescription_id}%` }
    }
    if(!isEmpty(title)){
      condition.title = { [Op.like]: `%${title}%` }
    }
    const paginatorOptions = getPaginationOptions(page, size);
    TestreportModel.findAndCountAll({
          where: condition,
          order:[['id', 'DESC']],
          include: [
            {
              model: UserModel,
              as: 'user'
            },
            {
              model: PrescriptionsModel,
              as: 'prescriptions'
            }
          ],
          offset: paginatorOptions.offset,
          limit: paginatorOptions.limit
        }).then( (data) => {
          let result = {
              items: TestreportCollection(data.rows),
              total: data.count,
            }
          res.send(formatResponse(result, 'All Testreports data'));
        })
        .catch(err => {
         console.log(err)
          res.status(errorCodes.default).send(formatErrorResponse(err));
        });
  
  }
  /**
   * get test-reports 
   * @param {*} req 
   * @param {*} res 
   */
  exports.store = async (req, res) => {
    let data = req.body;
    let obj = {
      user_id: req.userId,
      prescription_id: data.prescription_id || "",
      title: data.title || "",
      description: data.description || "",
    } 
    let images = [];
    if(isArray(data.images)){
      for(let i=0 ;i<data.images.length;i++){
        let result = base64FileUpload(data.images[i], "Test_report");
        if (result) {
          images.push(result);
        }
      }
      obj.images = images
    }
  
  
    let testreport = await TestreportModel.create(obj);
    if (!testreport) {
      return res.status(errorCodes.default).send(formatErrorResponse('Test reports does not created due to some error'));
    }
  
    res.send(formatResponse({}, "testreport store successfully"));
  
  }
  /**
   * get testreport
   * @param {*} req 
   * @param {*} res 
   */
  exports.edit = async (req, res) => {
      let testreport = await TestreportModel.findOne({ 
          order:[["id","DESC"]],
          include: [
            {
              model: UserModel,
              as: 'user'
            },
            {
              model: PrescriptionsModel,
              as: 'prescriptions'
            }
          ],
          where: { id: req.params.id }
       });
        if (!testreport) {
          return res.status(errorCodes.default).send(formatErrorResponse('No data found'));
        }
      
        res.send(formatResponse(TestreportCollection(testreport), "get successfully details"));
  
  }
  
  /**
   * Edit testreport
   * 
   * @param {*} req 
   * @param {*} res 
   */
  exports.update = async (req, res) => {
    let data = req.body;
    
    let postData = {
      prescription_id: data.prescription_id,
      title: data.title,
      description: data.description,
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
    
  
    TestreportModel.update(postData, { where: { user_id: req.userId, id : req.params.id} }).then(result => {
      res.send(formatResponse({}, "Test Report Data Updated successfully!"));
    }).catch(error => {
      return res.status(errorCodes.default).send(formatErrorResponse(error));
    });
  };
  
  /**
   * delete testreport
   * 
   * @param {*} req 
   * @param {*} res 
   */
  exports.delete = async (req, res) => {
    let id = req.params.id;
    let user = await TestreportModel.findOne({ where: { id: id, user_id:req.userId } });
    if (!user) {
      return res.status(errorCodes.default).send(formatErrorResponse('testreport not found'));
    }
  
    let test = await TestreportModel.destroy({ where: { id: id, user_id:req.userId } })
    if(test){
      res.send(formatResponse({},"Test Report deleted successfully"));
  
    }
    
  };
  
