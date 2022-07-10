export const login = (base_url: string = process.env.REACT_APP_RMS_URL) => {
  window.open(base_url + "login/?app-oauth=true", "oauth:adamrms", "");
  window.addEventListener("message", function (event) {
    if (event.data.match(/^oauth::/)) {
      const data = JSON.parse(event.data.substring(7));
      if (typeof data.token !== "undefined") {
        localStorage.setItem("token", data.token);
      } else {
        // TODO: Create a toast here
        console.log("THERE WAS AN ERROR LOGGING IN");
      }
    }
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  return localStorage.getItem("token") !== null;
};
