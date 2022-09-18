import { Route } from "react-router";
import Login from "../pages/auth/Login";
import { Logout, OauthCallback } from "./Auth";

/**
 * Add Unauthenticated routes to this component
 * @returns <Routes />
 */
export function Routes() {
  return (
    <>
      {/* Login */}
      <Route path="/oauth_callback" exact component={OauthCallback} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/login" exact component={Login} />
    </>
  );
}
