import { IonContent, IonSplitPane } from "@ionic/react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { isLoggedIn } from "../utilities/Auth";
import Menu from "./menu/Menu";

type AuthenticatedProps = {
  redirect?: boolean;
  redirect_path?: string;
};

const Authenticated: React.FC<AuthenticatedProps> = ({
  children,
  redirect_path = "/login",
}) => {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());

  useEffect(() => {
    console.log(authenticated);
    window.addEventListener("storage", () => {
      setAuthenticated(isLoggedIn());
    });
  }, []);

  if (authenticated) {
    return (
      <IonSplitPane contentId="main">
        <Menu />
        <IonContent id="main">{children}</IonContent>
      </IonSplitPane>
    );
  }
  return <Redirect to={redirect_path} />;
};

export default Authenticated;
