import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Box, Divider, HStack, Heading, Pressable, Text } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import {
  faClipboardList,
  faCube,
  faList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { RMSDrawerParamList } from "../../utilities/Routing";
import { MenuItem } from "./MenuItem";
import SkeletonLink from "../SkeletonLink";
import Logo from "../images/Logo";

import useAuth from "../../contexts/useAuth";

/**
 * Custom content for sidebar menu
 * @author @Robert-Watts
 */
const MenuContent = (props: any) => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  const { logout } = useAuth();

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
      url: "ProjectList",
      icon: faList,
    },
    {
      type: "route",
      title: "Crew Vacancies",
      url: "CrewRecruitment",
      icon: faClipboardList,
    },
    {
      type: "route",
      title: "CMS Pages",
      url: "/cms/",
      icon: faNewspaper,
    },
    //...CmsPageList(),
    {
      type: "section",
      title: "Settings",
    },
    /*{
      type: "function",
      title: rmsLocation.name + " - Change Location",
      icon: ["fas", "map-marker-alt"],
      function: () => {
        updateRMSLocation();
      },
    },
    {
      type: "function",
      title: "Change Business",
      icon: ["fas", "building"],
      function: () => {
        getInstances().then((buttons) => {
          present({
            header: "Change Business",
            buttons: buttons,
            onDidDismiss: ({ detail }) => handleInstanceSwitch(detail),
          });
        });
      },
    },*/
    {
      type: "function",
      title: "Logout",
      icon: faSignOutAlt,
      function: doLogout,
    },
  ];

  return (
    <DrawerContentScrollView {...props}>
      <Box m="2" p="2">
        <Box>
          <Logo />
        </Box>
        {menuItems.map((item, index) => {
          // Render a seperator
          if (item.type == "separator") {
            return <Divider key={index} />;
          }

          // Render a section
          if (item.type == "section") {
            return (
              <Box>
                <Heading ml="2" mb="1">
                  {item.title}
                </Heading>
                <Divider />
              </Box>
            );
          }

          // Render a function
          if (item.type == "function") {
            return (
              <Pressable key={index} onPress={item.function}>
                <HStack p="1" m="1">
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
              onPress={() => {
                item.type == "route"
                  ? navigation.navigate(item.url)
                  : undefined;
              }}
            >
              <HStack p="1" m="1">
                <Box my="auto" mr="2">
                  {item.icon && <FontAwesomeIcon icon={item.icon} />}
                </Box>
                <Heading>{item.title}</Heading>
              </HStack>
            </Pressable>
          );

          // If it is a route we want the menu to auto dismiss when it item is clicked
          return <Box key={index}>{renderMenuItem}</Box>;
        })}
      </Box>
    </DrawerContentScrollView>
  );
};

export default MenuContent;
