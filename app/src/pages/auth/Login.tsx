import Page from "../../components/Page";
import Authenticated from "../../components/Authenticated";
import { Redirect } from "react-router";
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
import { login } from "../../utilities/Auth";
import { useState } from "react";

const Login = () => {
  const [endpoint, setEndpoint] = useState<string>("https://dash.adam-rms.com");
  return (
    <>
      <Authenticated redirect={false}>
        <Redirect to={"/"} />
      </Authenticated>
      <Page title="Login" show_header={false}>
        <IonRow>
          <IonCol size={"4"} offset={"4"}>
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
