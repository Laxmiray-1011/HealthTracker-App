const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse ,postData} = require("@utils/response.config");
const { isEmpty,isArray, getFileAbsulatePath, defaultProfileImage } = require("@helpers/helper");
const {SugerCollection} =require("@resources/patient/sugerCollection");
const { base64FileUpload,removeFile,filterFilesFromRemove } = require("@helpers/upload");
const { getPaginationOptions, returnPaginated } = require('@helpers/paginator')
const db = require("@models");
const { Op } = require("sequelize");
const UserModel = db.users;
const SugerModel = db.suger;
const moment = require("moment");





// /**
//  * get Suger
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
    SugerModel.findAndCountAll({
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
              items: SugerCollection(data.rows),
              total: data.count,
            }
          res.send(formatResponse(result, 'All Suger report data'));
        })
        .catch(err => {
         console.log(err)
          res.status(errorCodes.default).send(formatErrorResponse(err));
        });
  
  }
  /**
   * get Suger 
   * @param {*} req 
   * @param {*} res 
   */
  exports.store = async (req, res) => {
    let data = req.body;
    let obj = {
      user_id: req.userId,
      FastingBloodSugerTest: data.FastingBloodSugerTest || "",
      RandomBloodSugerTest: data.RandomBloodSugerTest || "",
      date : moment(data.date,"YYYY-MM-DD"),
    } 
    
    let suger = await SugerModel.create(obj);
    if (!suger) {
      return res.status(errorCodes.default).send(formatErrorResponse('suger level does not added due to some error'));
    }
    res.send(formatResponse({}, "suger level added successfully"));
  
  }
  /**
   * get Suger
   * @param {*} req 
   * @param {*} res 
   */
  exports.edit = async (req, res) => {
      let suger = await SugerModel.findOne({ 
          order:[["id","DESC"]],
          include: [
            {
              model: UserModel,
              as: 'user'
            },
          ],
          where: { id: req.params.id }
       });
        if (!suger) {
          return res.status(errorCodes.default).send(formatErrorResponse('No data found'));
        }
      
        res.send(formatResponse(SugerCollection(suger), "get successfully details"));
  
  }
  
  /**
   * Edit Suger
   * 
   * @param {*} req 
   * @param {*} res 
   */
  exports.update = async (req, res) => {
    let data = req.body;
    
    let postData = {
      FastingBloodSugerTest: data.FastingBloodSugerTest || "",
      RandomBloodSugerTest: data.RandomBloodSugerTest || "",
      date : moment(data.date,"YYYY-MM-DD"),
    } 
    
    SugerModel.update(postData, { where: { user_id: req.userId, id : req.params.id} }).then(result => {
      res.send(formatResponse({}, "sugar lavel Updated successfully!"));
    }).catch(error => {
      return res.status(errorCodes.default).send(formatErrorResponse(error));
    });
  };
  
  /**
   * delete Suger
   * 
   * @param {*} req 
   * @param {*} res 
   */
  exports.delete = async (req, res) => {
    let id = req.params.id;
    let user = await SugerModel.findOne({ where: { id: id, user_id:req.userId } });
    if (!user) {
      return res.status(errorCodes.default).send(formatErrorResponse('sugar level not found'));
    }
  
    let sugar = await SugerModel.destroy({ where: { id: id, user_id:req.userId } })
    if(sugar){
      res.send(formatResponse({},"sugar lavel data deleted successfully"));
  
    }
    
  };
  
