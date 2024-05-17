const config = require("@config/auth.config");
const { errorCodes, formatErrorResponse, formatResponse ,postData} = require("@utils/response.config");
const { isEmpty,isArray, getFileAbsulatePath, defaultProfileImage } = require("@helpers/helper");
// const {BloodpressureCollection} =require("@resources/patient/bloodpressureCollection");
// const {SugerCollection} =require("@resources/patient/sugerCollection");
const {DiseasesCollection} =require("@resources/admin/diseasesCollection");
const { base64FileUpload,removeFile,filterFilesFromRemove } = require("@helpers/upload");
const { getPaginationOptions, returnPaginated } = require('@helpers/paginator')
const db = require("@models");
const { Op } = require("sequelize");
const UserModel = db.users;
const DiseasesModel = db.diseases;






// /**
//  * get Diseases
//  * @param {*} req 
//  * @param {*} res 
//  */
exports.index = async (req, res) => {
    let { page, size,name,slge,display_name} = req.query;
    let condition = {user_id: req.userId}
    if(!isEmpty(name)){
      condition.name ={ [Op.like]: `%${name}%` } 
    }
    if(!isEmpty(slge)){
        condition.slge ={ [Op.like]: `%${slge}%` } 
      }
      if(!isEmpty(display_name)){
        condition.display_name ={ [Op.like]: `%${display_name}%` } 
      }
    
    const paginatorOptions = getPaginationOptions(page, size);
    DiseasesModel.findAndCountAll({
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
              items: DiseasesCollection(data.rows),
              total: data.count,
            }
          res.send(formatResponse(result, 'All Diseases data'));
        })
        .catch(err => {
         console.log(err)
          res.status(errorCodes.default).send(formatErrorResponse(err));
        });
  
  }
  /**
   * get Diseases 
   * @param {*} req 
   * @param {*} res 
   */
  exports.store = async (req, res) => {
    let data = req.body;
    let obj = {
      user_id: req.userId,
      name: data.name || "",
      slge: data.slge || "",
      display_name: data.display_name || "",
    } 
    

    let diseases = await DiseasesModel.create(obj);
    if (!diseases) {
      return res.status(errorCodes.default).send(formatErrorResponse('Diseases does not created due to some error'));
    }
  
    res.send(formatResponse({}, "Diseases store successfully"));
  
  }
  /**
   * get Diseases
   * @param {*} req 
   * @param {*} res 
   */
  exports.edit = async (req, res) => {
      let diseases = await DiseasesModel.findOne({ 
          order:[["id","DESC"]],
          include: [
            {
              model: UserModel,
              as: 'user'
            },
          ],
          where: { id: req.params.id }
       });
        if (!diseases) {
          return res.status(errorCodes.default).send(formatErrorResponse('No data found'));
        }
      
        res.send(formatResponse(DiseasesCollection(diseases), "get Diseases successfully details"));
  
  }
  
  /**
   * Edit Diseases
   * 
   * @param {*} req 
   * @param {*} res 
   */
  exports.update = async (req, res) => {
    let data = req.body;
    
    let postData = {
      name: data.name || "",
      slge: data.slge || "",
      display_name: data.display_name || "",
    } 
    
    DiseasesModel.update(postData, { where: { user_id: req.userId, id : req.params.id} }).then(result => {
      res.send(formatResponse({}, "Diseases Updated successfully!"));
    }).catch(error => {
      return res.status(errorCodes.default).send(formatErrorResponse(error));
    });
  };
  
  /**
   * delete Diseases
   * 
   * @param {*} req 
   * @param {*} res 
   */
  exports.delete = async (req, res) => {
    let id = req.params.id;
    let user = await DiseasesModel.findOne({ where: { id: id, user_id:req.userId } });
    if (!user) {
      return res.status(errorCodes.default).send(formatErrorResponse('Diseases not found'));
    }
  
    let diseases = await DiseasesModel.destroy({ where: { id: id, user_id:req.userId } })
    if(diseases){
      res.send(formatResponse({},"Diseases deleted successfully"));
  
    }
    
  };
  
