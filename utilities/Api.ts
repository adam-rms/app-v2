import axios from "axios";
import { FetchData } from "./DataStorage";

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
  const baseURL = await FetchData("BaseURL");
  const token = await FetchData("AuthToken");
  if (token === null || baseURL === null) {
    throw new Error("[AUTH] Not logged in");
  }
  if (formData instanceof FormData) {
    formData.append("jwt", token);
  } else {
    formData["jwt"] = token;
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
      console.error(error);
    });
};

export default Api;
