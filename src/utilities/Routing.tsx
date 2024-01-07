import { useWindowDimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuContent, { LoginMenuContent } from "@component/menu/MenuContent";

// Screen Imports
import Login from "@page/Login";
import Home from "@page/Home";
import useAuth from "@context/useAuth";
import SetManualLocation from "@page/utilities/SetManualLocation";
import BarcodeScanner from "@page/utilities/BarcodeScanner";
import ProjectList from "@page/projects/ProjectList";
import Project from "@page/projects/Project";
import CrewRecruitment from "@page/projects/CrewRecruitment";
import CrewRecruitmentApplication from "@page/projects/CrewRecruitmentApplication";
import AssetTypeList from "@page/assets/AssetTypeList";
import Asset from "@page/assets/Asset";
import ProjectAssets from "@page/projects/ProjectAssets";
import DebugInfo from "@page/DebugInfo";
import CmsPageList from "@page/cms/CmsPageList";
import CmsPage from "@page/cms/CmsPage";
import HandleMagicLink from "@page/utilities/HandleMagicLink";
import HeaderLeftButton from "@component/menu/HeaderLeftButton";

/**
 * RMSDrawerParamList is a type that defines the parameters for each page.
 * This must be updated when a new page is added.
 * The sorting for authenticated and unauthenticated routes is for ease of reading only.
 */
export type RMSDrawerParamList = {
  //UnAuthenticated Routes
  Login: undefined;
  "magic-link": {
    token: string;
    referer: string;
  };

  //Authenticated Routes
  Home: undefined;

  // - Assets
  AssetList: undefined;
  Asset: { typeid: number; assetid?: number };

  // - Projects
  ProjectList: undefined;
  Project: { projectId: number };
  ProjectAssets: { projectId: number };
  CrewRecruitment: undefined;
  CrewRecruitmentApplication: { applicationId: number };

  // - CMS
  CmsPageList: undefined;
  CmsPage: { pageId: number };

  // - Utilities
  SetManualLocation: undefined;
  BarcodeScanner: {
    callback: "location" | "addAssetToProject"; // Extend this for other callbacks, eg assets
    returnPage: keyof RMSDrawerParamList;
    additionalData?: any;
  };

  // - Dev Tools
  DebugInfo: undefined;
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
  const dimensions = useWindowDimensions();

  return (
    <Drawer.Navigator
      id="rms-drawer"
      initialRouteName="Login"
      backBehavior="history"
      screenOptions={{
        drawerType:
          dimensions.width >= 768 && authenticated ? "permanent" : "front",
        swipeEnabled: authenticated,
        headerLeft: HeaderLeftButton,
      }}
      drawerContent={(props) =>
        authenticated ? (
          <MenuContent {...props} />
        ) : (
          <LoginMenuContent {...props} />
        )
      }
    >
      {authenticated ? (
        //Routes that require authentication
        <>
          <Drawer.Screen name="Home" component={Home} />

          {/*- Assets*/}
          <Drawer.Screen
            name="AssetList"
            component={AssetTypeList}
            options={{ title: "Assets" }}
          />
          <Drawer.Screen
            name="Asset"
            component={Asset}
            options={{ title: "Asset" }}
          />

          {/*- Projects*/}
          <Drawer.Screen
            name="ProjectList"
            component={ProjectList}
            options={{ title: "Projects" }}
          />
          <Drawer.Screen
            name="Project"
            component={Project}
            options={{ title: "Project" }}
          />
          <Drawer.Screen
            name="ProjectAssets"
            component={ProjectAssets}
            options={{ title: "Project Assets" }}
          />

          <Drawer.Screen
            name="CrewRecruitment"
            component={CrewRecruitment}
            options={{ title: "Crew Recruitment" }}
          />
          <Drawer.Screen
            name="CrewRecruitmentApplication"
            component={CrewRecruitmentApplication}
            options={{ title: "Crew Recruitment Application" }}
          />

          {/*- CMS Pages*/}
          <Drawer.Screen
            name="CmsPageList"
            component={CmsPageList}
            options={{ title: "CMS Pages" }}
          />
          <Drawer.Screen
            name="CmsPage"
            component={CmsPage}
            options={{ title: "CMS Page" }}
          />

          {/*- Utilities*/}
          <Drawer.Screen
            name="SetManualLocation"
            component={SetManualLocation}
            options={{ title: "Set Manual Location" }}
          />
          <Drawer.Screen
            name="BarcodeScanner"
            component={BarcodeScanner}
            options={{ title: "Barcode Scanner", headerShown: false }}
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
          <Drawer.Screen
            name="magic-link"
            component={HandleMagicLink}
            options={{ headerShown: false }}
          />
        </>
      )}
      {__DEV__ && (
        <Drawer.Screen
          name="DebugInfo"
          component={DebugInfo}
          options={{ title: "Debug Info" }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default Routing;
