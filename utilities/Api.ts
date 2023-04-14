import axios from "axios";
import { FetchData } from "./DataStorage";

/**
 * API Response Interface
 * @param result true if the request was successful
 * @param response the response data
 * @param error An error message to display to the user
 */
interface APIResponse {
  result: boolean;
  response?: any;
  error?: any;
}

/**
 * Get data from AdamRMS API
 * @param endpoint API endpoint
 * @param data any parameter data for the endpoint
 * @param method the HTTP Method used
 * @returns APIResponse object
 */
const Api = async (
  endpoint: string,
  formData: FormData | Record<any, any> = {},
): Promise<APIResponse> => {
  const baseURL = await FetchData("BaseURL");
  const token = await FetchData("AuthToken");
  if (token === null || baseURL === null) {
    console.error("[API] Not logged in");
    return {
      result: false,
      error: "Please login to continue",
    };
  }
  if (formData instanceof FormData) {
    formData.append("jwt", token);
  } else {
    formData["jwt"] = token;
  }

  axios.head(baseURL + "/api/" + endpoint).catch((error) => {
    console.error("[API]", error);
    return {
      result: false,
      error: "Unable to connect to server",
    };
  });

  return axios
    .post(baseURL + "/api/" + endpoint, formData)
    .then(function (response) {
      if (response.data["result"] == true) {
        return {
          result: true,
          response: response.data["response"],
        };
      } else {
        return {
          result: false,
          response: response.data["response"],
          error: response.data["error"],
        };
      }
    })
    .catch(function (error) {
      console.error(error);
      return {
        result: false,
        error: "Unable to connect to server",
      };
    });
};

export default Api;
