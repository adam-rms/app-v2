import "react-native-gesture-handler"; // Must be listed first
import "setimmediate";
import { extendTheme, NativeBaseProvider } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
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
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <ActionSheetProvider>
          <AuthProvider>
            {/* Our Authentication, which Navigation depends on */}
            <NavigationContainer>
              <ContextWrapper>
                <Routing />
              </ContextWrapper>
            </NavigationContainer>
          </AuthProvider>
        </ActionSheetProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
