import axios, { Method as MethodType } from "axios";

/**
 * Get data from AdamRMS API
 * @param endpoint API endpoint
 * @param data any parameter data for the endpoint
 * @param method the HTTP Method used
 * @returns response data as an Object
 */
const Api = async (
  endpoint: string,
  data: any = {},
  method: MethodType = "POST",
) => {
  data["jwt"] = localStorage.getItem("token");
  const baseURL = localStorage.getItem("baseURL");
  console.log(baseURL);
  return axios({
    method: method,
    url: baseURL + "/api/" + endpoint,
    data: { jwt: localStorage.getItem("token") },
    params: data,
  })
    .then(function (response) {
      if (response.data["result"] == true) {
        return response.data["response"];
      } else {
        return response.data;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default Api;
