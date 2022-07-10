import Page from "../../components/Page";
import Authenticated from "../../components/Authenticated";
import { Redirect } from "react-router";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonRow,
} from "@ionic/react";
import AdamRMSLogo from "../../assets/logo.png";
import { login } from "../../utilities/Auth";

const Login = () => {
  return (
    <>
      <Authenticated redirect={false}>
        <Redirect to={"/"} />
      </Authenticated>
      <Page title="Login" show_header={false}>
        <IonRow>
          <IonCol size={"12"}>
            <IonCard>
              <img src={AdamRMSLogo} alt={"Adam RMS Logo"} />

              <IonCardContent>
                <IonButton
                  expand={"block"}
                  fill={"solid"}
                  color={"tertiary"}
                  onClick={() => login()}
                >
                  Login
                </IonButton>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </Page>
    </>
  );
};

export default Login;
