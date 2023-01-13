import {
  IonItemDivider,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  useIonActionSheet,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledIonContent from "./components/StyledIonContent";
import StyledIonList from "./components/StyledIonList";
import StyledIonItem from "./components/StyledIonItem";
import StyledIonLabel from "./components/StyledIonLabel";
import BrandImage from "./components/BrandImage";
import BrandContainer from "./components/BrandContainer";
import BrandText from "./components/BrandText";
import CmsPageList from "./components/CmsPageList";
import SkeletonLink from "./components/SkeletonLink";
import { MenuItem } from "./components/MenuItem";
import { useContext } from "react";
import { LocationContext } from "../../contexts/location/LocationContext";
import {
  getInstances,
  handleInstanceSwitch,
} from "./components/InstanceSwitcher";

const FONT_AWESOME_MULTIPLIER: SizeProp | undefined = "1x";

/**
 * The Menu!
 */
const Menu: React.FC = () => {
  const location = useLocation();
  const [present] = useIonActionSheet();
  const { rmsLocation, updateRMSLocation } = useContext(LocationContext);

  // Add new pages to this array.
  // The type must be set as defined in MenuItem.d.ts. This is
  // normally either "item", "route", "function", "separator" or "section" but
  // this may change so please check the file as you update this array.
  const menuItems: MenuItem[] = [
    {
      type: "route",
      title: "Assets",
      url: "/assets/",
      icon: "cube",
    },
    {
      type: "route",
      title: "Projects",
      url: "/projects/",
      icon: "list",
    },
    {
      type: "route",
      title: "Crew Vacancies",
      url: "/projects/crew/vacancies",
      icon: "clipboard-list",
    },
    {
      type: "route",
      title: "CMS Pages",
      url: "/cms/",
      icon: ["far", "newspaper"],
    },
    ...CmsPageList(),
    {
      type: "section",
      title: "Settings",
    },
    {
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
    },
    {
      type: "route",
      title: "Logout",
      url: "/logout/",
      icon: ["fas", "sign-out-alt"],
    },
  ];

  return (
    <IonMenu contentId="main" type="overlay">
      <StyledIonContent>
        <BrandContainer>
          <BrandImage src="https://cdn.adam-rms.com/img/logoicon.png" />
          <BrandText>AdamRMS</BrandText>
        </BrandContainer>
        <StyledIonList id="adamRMS-menu-list">
          {menuItems.map((item, index) => {
            // Render a seperator
            if (item.type == "separator") {
              return <IonItemDivider key={index} />;
            }

            // Render a section
            if (item.type == "section") {
              return (
                <IonItemDivider key={index}>
                  <IonLabel>{item.title}</IonLabel>
                </IonItemDivider>
              );
            }

            // Render a function
            if (item.type == "function") {
              return (
                <StyledIonItem
                  key={index}
                  button
                  lines="none"
                  detail={false}
                  onClick={item.function}
                >
                  <StyledIonLabel slot="start">
                    {item.icon && (
                      <FontAwesomeIcon
                        icon={item.icon}
                        size={FONT_AWESOME_MULTIPLIER}
                      />
                    )}
                  </StyledIonLabel>

                  <StyledIonLabel>{item.title}</StyledIonLabel>
                </StyledIonItem>
              );
            }

            // If the code is at this point it must be either an item or a route
            // We can therefore check if its loading
            if (item.isLoading) {
              return (
                <SkeletonLink
                  fontAwesomeMultiplier={FONT_AWESOME_MULTIPLIER}
                  key={index}
                />
              );
            }

            // Create the component for both a item or a route
            const renderMenuItem = (
              <StyledIonItem
                color={
                  item.type == "route" && location.pathname === item.url
                    ? "medium"
                    : undefined
                }
                routerLink={item.type == "route" ? item.url : undefined}
                routerDirection="none"
                lines="none"
                detail={false}
                onClick={item.type == "item" ? item.onClick : undefined}
              >
                <StyledIonLabel slot="start">
                  {item.icon && (
                    <FontAwesomeIcon
                      icon={item.icon}
                      size={FONT_AWESOME_MULTIPLIER}
                    />
                  )}
                </StyledIonLabel>
                <StyledIonLabel>{item.title}</StyledIonLabel>
              </StyledIonItem>
            );

            // If it is a route we want the menu to auto dismiss when it item is clicked
            if (item.type == "route") {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  {renderMenuItem}
                </IonMenuToggle>
              );
            } else {
              return <span key={index}>{renderMenuItem}</span>;
            }
          })}
        </StyledIonList>
      </StyledIonContent>
    </IonMenu>
  );
};

export default Menu;
