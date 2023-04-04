import "react-native-gesture-handler"; // Must be listed first
import "setimmediate";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { AuthProvider } from "./contexts/useAuth";
import Routing from "./utilities/Routing";
import { LocationProvider } from "./contexts/useRMSLocation";

const theme = createTheme({
  lightColors: {
    primary: "#F77E9D",
    secondary: "#3DC2FF",
    success: "#2DD36F",
    warning: "#FFC409",
    error: "#EB445A",
  },
  darkColors: {
    primary: "#F77E9D",
    secondary: "#50C8FF",
    success: "#2FDF75",
    warning: "#FFD534",
    error: "#FF4961",
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <RootSiblingParent>
          <ActionSheetProvider>
            <AuthProvider>
              {/* Our Authentication, which Navigation depends on */}
              <NavigationContainer>
                <LocationProvider>
                  {/* Location is a Global Context, and depends on the Navigation Container */}
                  <Routing />
                </LocationProvider>
              </NavigationContainer>
            </AuthProvider>
          </ActionSheetProvider>
        </RootSiblingParent>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
