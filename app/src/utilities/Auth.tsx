import { Redirect, useLocation } from "react-router-dom";

/**
 * Login utility function. Opens AdamRMS login to the URL set in .env
 * @param base_url defaults to .env REACT_APP_RMS_URL value
 */
export const login = (base_url: string = process.env.REACT_APP_RMS_URL) => {
  window.open(
    base_url +
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
  return <Redirect to="/login/" />;
};

export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};
