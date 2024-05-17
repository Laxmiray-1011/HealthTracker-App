import axios from "axios";

export const signIn = (mobile, password) => {
  return axios.post("http://localhost:8089/api/patient/auth/signin", {
    mobile: mobile,
    password: password,
  });
};

export const signUp = (name, mobile, password) => {
  return axios.post(process.env.API_URL + "/api/patient/auth/signup", {
    name: name,
    mobile: mobile,
    password: password,
  });
};

export const getPrescriptions = (access_token) => {
  return axios.get("http://localhost:8089/api/patient/prescriptions", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

// export const checkValidation = () => {
//   if (sessionStorage.getItem("user") !== null && sessionStorage.getItem("access_token") !== null) {
//     console.log("Key exists");
//   } else {
//     window.location.href = "/patient/sign-in";
//   }
// };
