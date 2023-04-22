import Page from "../../components/Page";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import AdamRMSLogo from "../../assets/logo.png";
import { login, isLoggedIn } from "../../utilities/Auth";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";

const Login = () => {
  const [endpoint, setEndpoint] = useState<string>("https://dash.adam-rms.com");
  const [authenticated, setAuthenticated] = useState(isLoggedIn());

  //update authenticated state when token is added or removed
  useEffect(() => {
    window.addEventListener("storage", () => {
      setAuthenticated(isLoggedIn());
    });
  }, []);

  if (authenticated) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Page title="Login" show_header={false}>
        <IonRow>
          <IonCol size="12" sizeLg="4" offsetLg="4">
            <IonCard>
              <IonCardContent>
                <IonRow>
                  <IonCol size={"4"} offset={"4"}>
                    <img src={AdamRMSLogo} alt="AdamRMS Logo" />
                  </IonCol>
                  <IonCol size={"12"}>
                    <IonItem className="ion-margin">
                      <IonLabel position="floating">Endpoint</IonLabel>
                      <IonInput
                        type="text"
                        placeholder="AdamRMS Endpoint"
                        value={endpoint}
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        onIonChange={(e) => setEndpoint(e.detail.value!)} //this is ionic's fault
                      />
                    </IonItem>
                    <IonButton
                      expand={"block"}
                      fill={"solid"}
                      color={"tertiary"}
                      onClick={() => login(endpoint)}
                    >
                      Login
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </Page>
    </>
  );
};

export default Login;
