import "react-native-gesture-handler"; // Must be listed first
import "setimmediate";
import {
  TRenderEngineProvider,
  RenderHTMLConfigProvider,
} from "react-native-render-html";
import { extendTheme, NativeBaseProvider, Text } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import * as Linking from "expo-linking";
import { AuthProvider } from "./contexts/useAuth";
import ContextWrapper from "./contexts/ContextWrapper";
import Routing from "./utilities/Routing";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://3937ab95cc404dfa95b0e0cb91db5fc6@o83272.ingest.sentry.io/5204912",
  enableInExpoDevelopment: false,
  debug: __DEV__,
  environment: __DEV__ ? "Development" : "Production",
});

const theme = extendTheme({
  colors: {
    primary: "#F77E9D",
    secondary: "#3DC2FF",
    tertiary: "#6A64FF",
    success: "#2DD36F",
    warning: "#FFC409",
    error: "#EB445A",
  },
  components: {
    Container: {
      defaultProps: {
        maxW: "100%",
      },
    },
    Pressable: {
      defaultProps: {
        maxW: "100%",
      },
    },
  },
});

export default function App() {
  //Deep Linking
  const prefix = Linking.createURL("/");
  const linking = {
    prefixes: [prefix],
  };

  return (
    <TRenderEngineProvider>
      <RenderHTMLConfigProvider>
        <SafeAreaProvider>
          <NativeBaseProvider theme={theme}>
            <ActionSheetProvider>
              <AuthProvider>
                {/* Our Authentication, which Navigation depends on */}
                <NavigationContainer
                  linking={linking}
                  fallback={<Text>Loading...</Text>}
                >
                  <ContextWrapper>
                    <Routing />
                  </ContextWrapper>
                </NavigationContainer>
              </AuthProvider>
            </ActionSheetProvider>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </RenderHTMLConfigProvider>
    </TRenderEngineProvider>
  );
}
