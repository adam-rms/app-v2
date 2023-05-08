import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Box, Divider, HStack, Heading, Pressable } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import {
  faClipboardList,
  faCube,
  faList,
  faMapLocation,
  faSignOutAlt,
  faBuilding,
  faCogs,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { RMSDrawerParamList } from "../../utilities/Routing";
import { MenuItem } from "./MenuItem";
import SkeletonLink from "../SkeletonLink";
import Logo from "../images/Logo";

import useAuth from "../../contexts/useAuth";
import useRMSLocation from "../../contexts/useRMSLocation";
import useInstances from "../../contexts/useInstances";

/**
 * Custom content for sidebar menu
 * @author @Robert-Watts
 */
const MenuContent = (props: any) => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  const { logout } = useAuth();
  const { getRMSLocation, updateRMSLocation } = useRMSLocation();
  const { switchInstance, instancePermissionCheck } = useInstances();

  const rmsLocation = getRMSLocation(false);

  const doLogout = () => {
    logout();
  };

  // Add new pages to this array.
  // The type must be set as defined in MenuItem.d.ts. This is
  // normally either "item", "route", "function", "separator" or "section" but
  // this may change so please check the file as you update this array.
  const menuItems: MenuItem[] = [
    {
      type: "route",
      title: "Assets",
      url: "AssetList",
      icon: faCube,
    },
    {
      type: "route",
      title: "Projects",
      permission: "PROJECTS:VIEW",
      url: "ProjectList",
      icon: faList,
    },
    {
      type: "route",
      title: "Crew Vacancies",
      permission: "PROJECTS:PROJECT_CREW:VIEW:VIEW_AND_APPLY_FOR_CREW_ROLES",
      url: "CrewRecruitment",
      icon: faClipboardList,
    },
    {
      type: "route",
      title: "CMS Pages",
      url: "CmsPageList",
      icon: faNewspaper,
    },
    //...CmsPageList(),
    {
      type: "section",
      title: "Settings",
    },
    {
      type: "function",
      title: rmsLocation.name ?? "No Location Set",
      icon: faMapLocation,
      function: () => {
        updateRMSLocation();
      },
    },
    {
      type: "function",
      title: "Change Business",
      icon: faBuilding,
      function: () => {
        switchInstance();
      },
    },
    {
      type: "function",
      title: "Logout",
      icon: faSignOutAlt,
      function: doLogout,
    },
  ];

  if (__DEV__) {
    menuItems.push({
      type: "section",
      title: "Dev Tools",
    });
    menuItems.push({
      type: "route",
      title: "Debug Info",
      url: "DebugInfo",
      icon: faCogs,
    });
  }

  return (
    <DrawerContentScrollView {...props}>
      <Box m="2" p="2">
        <Box>
          <Logo />
        </Box>
        {menuItems.map((item, index) => {
          //Check whether there is a permission and if the user has it
          if (
            (item.permission && instancePermissionCheck(item.permission)) ||
            !item.permission
          ) {
            // Render a seperator
            if (item.type == "separator") {
              return <Divider key={index} />;
            }

            // Render a section
            if (item.type == "section") {
              return (
                <Box key={index} mt={3}>
                  <Heading ml="2">{item.title}</Heading>
                  <Divider />
                </Box>
              );
            }

            // Render a function
            if (item.type == "function") {
              return (
                <Pressable key={index} onPress={item.function}>
                  <HStack m="1">
                    <Box my="auto" mr="2">
                      {item.icon && <FontAwesomeIcon icon={item.icon} />}
                    </Box>

                    <Heading>{item.title}</Heading>
                  </HStack>
                </Pressable>
              );
            }

            // If the code is at this point it must be either an item or a route
            // We can therefore check if its loading
            if (item.isLoading) {
              return <SkeletonLink key={index} />;
            }

            // Create the component for both a item or a route
            const renderMenuItem = (
              <Pressable
                key={index}
                onPress={() => {
                  item.type == "route"
                    ? navigation.navigate(item.url)
                    : undefined;
                }}
              >
                <HStack m="1">
                  <Box my="auto" mr="2">
                    {item.icon && <FontAwesomeIcon icon={item.icon} />}
                  </Box>
                  <Heading>{item.title}</Heading>
                </HStack>
              </Pressable>
            );

            // If it is a route we want the menu to auto dismiss when it item is clicked
            return <Box key={index}>{renderMenuItem}</Box>;
          }
        })}
      </Box>
    </DrawerContentScrollView>
  );
};

//Menu Content for unauthenticated Routes
export const LoginMenuContent = (props: any) => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  return (
    <DrawerContentScrollView {...props}>
      <Box m="2" p="2">
        <Box>
          <Logo />
        </Box>
        <Pressable
          key="login"
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <HStack p="1" m="1">
            <Box my="auto" mr="2">
              <FontAwesomeIcon icon={faPerson} />
            </Box>
            <Heading>Log In</Heading>
          </HStack>
        </Pressable>
        {__DEV__ && (
          <Pressable
            key="DebugInfo"
            onPress={() => {
              navigation.navigate("DebugInfo");
            }}
          >
            <HStack p="1" m="1">
              <Box my="auto" mr="2">
                <FontAwesomeIcon icon={faCogs} />
              </Box>
              <Heading>Debug Info</Heading>
            </HStack>
          </Pressable>
        )}
      </Box>
    </DrawerContentScrollView>
  );
};

export default MenuContent;
