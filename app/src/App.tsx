import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Routes } from "./utilities/Routes";
import Contexts from "./contexts/Context";
import React, { useEffect } from "react";
import { App as CapApp } from "@capacitor/app";
import { isPlatform } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import GlobalStyle from "./theme/GlobalStyle";
import IonicTheme from "./theme/IonicTheme";

/*Font Awesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

//setup Font Awesome icons
library.add(fab, far, fas);

const App: React.FC = () => {
  // Set up Ionic Config
  setupIonicReact();

  useEffect(() => {
    if (isPlatform("capacitor")) {
      // We're on mobile so need an app URL listener for the OAuth callback
      // Mirrors the page redirect in Auth.tsx
      CapApp.addListener("appUrlOpen", async ({ url }) => {
        if (url.startsWith("com.bstudios.adamrms")) {
          if (url.includes("oauth_callback") && url.includes("token")) {
            const token = new URLSearchParams(url).get(
              "com.bstudios.adamrms://oauth_callback?token",
            ); // app URLs are not parsed by the browser
            if (token) {
              localStorage.setItem("token", token);
            }
          }
        }
      });
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <IonicTheme />
      <IonApp>
        <Contexts>
          <IonReactRouter>
            <IonRouterOutlet>
              <Routes />
            </IonRouterOutlet>
          </IonReactRouter>
        </Contexts>
      </IonApp>
    </>
  );
};

export default App;
