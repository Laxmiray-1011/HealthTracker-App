const { isObject, getFileAbsulatePath, isEmpty, defaultProfileImage, formatDateTime ,isArray} = require("@helpers/helper");
const db = require("@models");
const RoleModel = db.roles;

const BloodpressureCollection = (data) => {
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
        user_id: data.user_id ?? 0,
        user_name: data.user && data.user.name ? data.user.name : "",
        high: data.high ?? "",
        low: data.low ?? "",
        date: formatDateTime(data.date,4),
    }
}

module.exports = {
    BloodpressureCollection
}
