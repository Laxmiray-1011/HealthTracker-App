const { isObject, getFileAbsulatePath, isEmpty, defaultProfileImage, formatDateTime ,isArray} = require("@helpers/helper");
const db = require("@models");
const RoleModel = db.roles;

const TestreportCollection = (data) => {
    if (isObject(data)) {
        return getModelObject(data);
    } else {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            arr.push(getModelObject(data[i]));
        }
        return arr;
    }
}

const getModelObject = (data) => {
    
    let images = [], image = "" //defaultImage();
    if (isArray(data.images)) {
        for (let i = 0; i < data.images.length; i++) {
            images.push({
                file_name: data.images[i].file_name,
                path: getFileAbsulatePath(data.images[i].path),
            })
        }
        if (data.images.length > 0) {
            image = getFileAbsulatePath(data.images[0].path);
        }
    }
    return {
        id: data.id,
        user_id: data.user_id ?? 0,
        user_name: data.user && data.user.name ? data.user.name : "",
        prescription_id: data.prescription_id ?? "",
        title: data.title ?? "",
        description: data.description ?? "",
        images: images,
        image: image,
    }

    
}

module.exports = {
    TestreportCollection
}
