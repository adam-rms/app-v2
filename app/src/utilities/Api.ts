import axios from "axios";

/**
 * Get data from AdamRMS API
 * @param endpoint API endpoint
 * @param data any parameter data for the endpoint
 * @param method the HTTP Method used
 * @returns response data as an Object
 */
const Api = async (
  endpoint: string,
  formData: FormData | Record<any, any> = {},
) => {
  const baseURL = localStorage.getItem("baseURL");
  if (formData instanceof FormData) {
    formData.append("jwt", localStorage.getItem("token") as string);
  } else {
    formData["jwt"] = localStorage.getItem("token") as string;
  }
  return axios
    .post(baseURL + "/api/" + endpoint, formData)
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
