
const moment = require("moment");

const isEmpty = (value) => {
	return (
		// null or undefined
		(value == null || value == 'null') ||
		
		// 0 value
		(value == 0) || 

		// has length and it's zero
		(value.hasOwnProperty('length') && value.length === 0) ||

		// is an Object and has no keys
		(value.constructor === Object && Object.keys(value).length === 0)
	)
}

const formatDateTime = (date, format) => {
  if(isEmpty(date)){
    return '';
  }
  format = format === undefined ? 1 : format;
  switch (format) {
    case 1:
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
      break;
    case 2:
      return moment(date).format('HH:mm')
      break;
    case 3:
      return moment(date).format('HH:mm:ss')
      break;
    case 4:
      return moment(date).format('DD MMM, YYYY hh:mm A')
      break;
    case 5:
      return moment(date).format('DD MMM, YYYY')
      break;
    case 6:
      return moment(date).format('hh:mm A')
      break;
    case 7:
      return moment(date).format('DD/MM/YYYY hh:mm A')
      break;
    case 8:
      return moment(date).format('DD/MM/YYYY')
      break;
    case 9:
      return moment(date).format('MM/DD/YYYY')
      break;
    case 10:
      return moment(date).format('YYYY-MM-DD')
      break;
  
    default:
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
      break;
  }
}

const isArray = (arr) => {
  return Array.isArray(arr);
}

const isObject = (arr) => {
  return Object.prototype.toString.call(arr).indexOf("Object")>-1;
}

const convertToSlug = (Text) => {
  return Text
      .toLowerCase()
      .replace(/ /g,'-')
      .replace(/[^\w-]+/g,'')
      ;
}

const ucWords = (text) =>{
  return !text ? '' : text.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase());
}

const getFileAbsulatePath = (f) => {
  return process.env.BASE_URL + f;
}

const defaultProfileImage = (img) => {
  return process.env.BASE_URL + "public/images/default_user.jpg";
}
const appVersion = (type) => {
  if(type="patient"){
    return '1.0.0';
  }else{
    return '1.0.0';
  }
  
}

module.exports = {
	isEmpty,
	formatDateTime,
	isArray,
	isObject,
	convertToSlug,
	ucWords,
	defaultProfileImage,
	getFileAbsulatePath,
  appVersion
}