const { isObject, getFileAbsulatePath, isEmpty, defaultProfileImage, formatDateTime ,isArray} = require("@helpers/helper");
const db = require("@models");
const RoleModel = db.roles;

const DiseasesCollection = (data) => {
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
        name: data.name ?? 0,
        slge: data.slge ?? "",
        display_name: data.display_name ?? "",
    }
}

module.exports = {
    DiseasesCollection
}
