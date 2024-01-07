import "react-native-gesture-handler"; // Must be listed first
import "setimmediate";
import {
  TRenderEngineProvider,
  RenderHTMLConfigProvider,
} from "react-native-render-html";
import { extendTheme, NativeBaseProvider, Text } from "native-base";
import { GluestackUIProvider, config } from "@gluestack-ui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import * as Linking from "expo-linking";
import { AuthProvider } from "@context/useAuth";
import ContextWrapper from "@context/ContextWrapper";
import Routing from "@utility/Routing";
import * as Sentry from "sentry-expo";

// Sentry Reporting

// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation =
  new Sentry.Native.ReactNavigationInstrumentation();

Sentry.init({
  dsn: "https://3937ab95cc404dfa95b0e0cb91db5fc6@o83272.ingest.sentry.io/5204912",
  enableInExpoDevelopment: false,
  debug: __DEV__, //logs all sentry info, which is a lot with touch events
  environment: __DEV__ ? "Development" : "Production",
  integrations: [
    new Sentry.Native.ReactNativeTracing({
      routingInstrumentation,
    }),
  ],
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

function App() {
  // Create a ref for the navigation container
  const navigationRef = createNavigationContainerRef();

  //Deep Linking
  const prefix = Linking.createURL("/");
  const linking = {
    prefixes: [prefix],
  };

  return (
    <Sentry.Native.TouchEventBoundary>
      <TRenderEngineProvider>
        <RenderHTMLConfigProvider>
          <SafeAreaProvider>
            <GluestackUIProvider config={config.theme}>
              <NativeBaseProvider theme={theme}>
                <ActionSheetProvider>
                  <AuthProvider>
                    {/* Our Authentication, which Navigation depends on */}
                    <NavigationContainer
                      linking={linking}
                      fallback={<Text>Loading...</Text>}
                      ref={navigationRef}
                      onReady={() => {
                        routingInstrumentation.registerNavigationContainer(
                          navigationRef,
                        );
                      }}
                    >
                      <ContextWrapper>
                        <Routing />
                      </ContextWrapper>
                    </NavigationContainer>
                  </AuthProvider>
                </ActionSheetProvider>
              </NativeBaseProvider>
            </GluestackUIProvider>
          </SafeAreaProvider>
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    </Sentry.Native.TouchEventBoundary>
  );
}

export default Sentry.Native.wrap(App);
