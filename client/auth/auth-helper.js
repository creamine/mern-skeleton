// File to host methods that will manage auth state (Retrieving, Saving & Deleting credentials)
import { signout } from "./api-auth.js";
const auth = {
  // isAuthenticated(): Method to retrieve credentials from the sessionStorage.
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (sessionStorage.getItem("jwt"))
      return JSON.parse(sessionStorage.getItem("jwt"));
    else return false;
  },
  // The authenticate method takes the JWT credentials, jwt, and a callback function, cb, as arguments.
  // It stores the credentials in sessionStorage after ensuring window is defined,
  // in other words ensuring this code is running in a browser and hence has access to sessionStorage.
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },
  // clearJWT: This method takes a callback function as an argument, and it removes the JWT credential from sessionStorage.
  clearJWT(cb) {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    cb();
    //optional
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};

export default auth;
