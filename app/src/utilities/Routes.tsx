import { Route } from "react-router";
import Login from "../pages/auth/Login";

/**
 * Add Unauthenticated routes to this component
 * @returns <Routes />
 */
export function Routes() {
  return (
    <>
      {/* Login */}
      <Route path="/login" exact component={Login} />
    </>
  );
}
