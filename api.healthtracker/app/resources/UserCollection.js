const { isObject, getFileAbsulatePath, isEmpty, defaultProfileImage } = require("@helpers/helper");
const db = require("@models");
const RoleModel = db.roles;

const UserCollection = async(data) => {
    if(isObject(data)){
        return await getModelObject(data);
    }else{
        let arr = [];
        for(let i = 0; i < data.length; i++){
            arr.push(await getModelObject(data[i]));
        }
        return arr;
    }
}

const getModelObject = async(data) => {
    let role = await RoleModel.findByPk(data.role_id);
    return {
        id: data.id,
        email: data.email ?? "",
        name: data.name,
        mobile: data.mobile ?? "",
        image: (!isEmpty(data.profile_image)) ? getFileAbsulatePath(data.profile_image) : defaultProfileImage(),
        role_name: role.display_name
    }
}

module.exports = {
    UserCollection
}
