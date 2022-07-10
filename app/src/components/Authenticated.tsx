import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { isLoggedIn } from "../utilities/Auth";

type AuthenticatedProps = {
  redirect?: boolean;
  redirect_path?: string;
};

const Authenticated: React.FC<AuthenticatedProps> = ({
  children,
  redirect = true,
  redirect_path = "/login",
}) => {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());

  useEffect(() => {
    window.addEventListener("storage", (e: StorageEvent) => {
      setAuthenticated(isLoggedIn());
    });
  }, []);

  if (authenticated) {
    return <>{children}</>;
  }

  if (redirect) {
    return <Redirect to={redirect_path} />;
  }

  return <></>;
};

export default Authenticated;
