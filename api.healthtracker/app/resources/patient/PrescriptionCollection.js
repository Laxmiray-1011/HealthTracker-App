const { isObject, getFileAbsulatePath, isEmpty, defaultProfileImage, formatDateTime ,isArray} = require("@helpers/helper");
const db = require("@models");
const RoleModel = db.roles;

const PrescriptionCollection = (data) => {
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
    let images = [], image = "" //defaultImage();
    if (isArray(images)) {
        for (let i = 0; i < images.length; i++) {
            images.push({
                file_name: images[i].file_name,
                path: getFileAbsulatePath(data.images[i].path),
            })
        }
        if (images.length > 0) {
            image = getFileAbsulatePath(images[0].path);
        }
    }
    return {
        id: data.id,
        user_id: data.user_id ?? 0,
        dr_name: data.dr_name ?? "",
        place: data.place ?? "",
        description: data.description ?? "",
        dr_visit_date : formatDateTime(data.dr_visit_date,4),
        image: image,
        images: images,
    }
}

module.exports = {
    PrescriptionCollection
}
