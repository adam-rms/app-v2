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
