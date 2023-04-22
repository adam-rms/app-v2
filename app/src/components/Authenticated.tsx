import { IonContent } from "@ionic/react";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { isLoggedIn } from "../utilities/Auth";
import Menu from "./menu/Menu";
import StyledIonSplitPane from "./styled/StyledIonSplitPane";

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
    window.addEventListener("storage", () => {
      setAuthenticated(isLoggedIn());
    });
  }, []);

  if (authenticated) {
    return (
      <StyledIonSplitPane contentId="main">
        <Menu />
        <IonContent id="main">{children}</IonContent>
      </StyledIonSplitPane>
    );
  }
  return <Redirect to={redirect_path} />;
};

export default Authenticated;
