import { createDrawerNavigator } from "@react-navigation/drawer";

// Screen Imports
import Login from "../pages/Login";
import Home from "../pages/Home";
import useAuth from "../contexts/useAuth";
import SetManualLocation from "../pages/utilities/SetManualLocation";

/**
 * RMSDrawerParamList is a type that defines the parameters for each page.
 * This must be updated when a new page is added.
 * The sorting for authenticated and unauthenticated routes is for ease of reading only.
 */
export type RMSDrawerParamList = {
  //UnAuthenticated Routes
  Login: undefined;

  //Authenticated Routes
  Home: undefined;

  // - Utilities
  SetManualLocation: undefined;
};

//The actual navigator context
const Drawer = createDrawerNavigator<RMSDrawerParamList>();

/**
 * We're using React Navigation's Drawer to handle routing.
 * To add a new page, update ``RMSDrawerParamList`` with the parameters the page needs,
 * then add a new ``Drawer.Screen`` with the name of the page and the component.
 *
 * This also means that RMSDrawerParamList should be used on pages to provide the props:
 * ```NativeStackScreenProps<RMSDrawerParamList, 'Page Name', 'rms-drawer'>```
 * ---
 * @link https://reactnavigation.org/docs/drawer-navigator
 */
const Routing = () => {
  const { authenticated } = useAuth();

  return (
    <Drawer.Navigator
      id="rms-drawer"
      initialRouteName="Login"
      backBehavior="history"
    >
      {authenticated ? (
        //Routes that require authentication
        <>
          <Drawer.Screen name="Home" component={Home} />

          {/*- Utilities*/}
          <Drawer.Screen
            name="SetManualLocation"
            component={SetManualLocation}
            options={{ title: "Set Manual Location" }}
          />
        </>
      ) : (
        //Routes that don't require authentication
        <>
          <Drawer.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default Routing;
