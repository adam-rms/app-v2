import { Redirect, useLocation } from "react-router-dom";

/**
 * Login utility function. Opens AdamRMS login
 * @param baseURL AdamRMS API base URL (e.g. https://dash.adam-rms.com)
 */
export const login = (baseURL = "https://dash.adam-rms.com") => {
  localStorage.setItem("baseURL", baseURL);
  window.open(
    baseURL +
      "/login/?app-oauth=true&returnHost=" +
      window.location.hostname +
      (window.location.port ? ":" + window.location.port : ""),
    "_self",
    "",
  );
};

/**
 * Handles the reciept of the token from AdamRMS and stores it locally
 * Redirects to assets if successful
 */
export const OauthCallback = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  if (token) {
    localStorage.setItem("token", token);
  }

  return <Redirect to="/assets/" />;
};

/**
 * Removes current token from local storage
 * Redirects to Login
 */
export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("baseURL");
  return <Redirect to="/login/" />;
};

export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};
