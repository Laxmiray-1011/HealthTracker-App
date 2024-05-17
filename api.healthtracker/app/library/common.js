const db = require("@models");

const getRoleId = (name) => {
    let roleId = 0;
    switch (name) {
        case 'admin':
            roleId = 1;
            break;

        case 'patient':
            roleId = 2;
            break;
        
        default:
            break;
    }
    return roleId;
}

module.exports = {
    getRoleId
}