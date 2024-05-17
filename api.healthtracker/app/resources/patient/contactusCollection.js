const { isObject, getFileAbsulatePath, isEmpty, defaultProfileImage, formatDateTime ,isArray} = require("@helpers/helper");
const db = require("@models");
const RoleModel = db.roles;

const contactusCollection = (data) => {
    if(isObject(data)){
        return  getModelObject(data);
    }else{
        let arr = [];
        for(let i = 0; i < data.length; i++){
            arr.push( getModelObject(data[i]));
        }
        return arr;
    }
}

const getModelObject = (data) => {
    return {
        id: data.id,
        name:data.name ?? "",
        email: data.email ?? "",
        mobile: data.mobile ?? "",
        questions: data.questions ?? "",
        status: data.status ?? "",
    }
}

module.exports = {
    contactusCollection
}
