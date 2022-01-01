import { IonMenu, IonMenuToggle } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { faCube, faList } from "@fortawesome/free-solid-svg-icons";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledIonContent from "./components/StyledIonContent";
import StyledIonList from "./components/StyledIonList";
import StyledIonItem from "./components/StyledIonItem";
import StyledIonLabel from "./components/StyledIonLabel";
import BrandImage from "./components/BrandImage";
import BrandContainer from "./components/BrandContainer";
import BrandText from "./components/BrandText";
import CmsPages from "./components/CmsPages";
import SkeletonLink from "./components/SkeletonLink";

export interface AppPage {
  url: string | undefined;
  icon?: IconProp | null;
  title?: string;
  subpage?: Array<AppPage>;
  isLoading?: boolean;
}

const FONT_AWESOME_MULTIPLIER: SizeProp | undefined = "1x";

const Menu: React.FC = () => {
  const location = useLocation();

  //Add new pages to this array
  const appPages: AppPage[] = [
    {
      title: "Assets",
      url: "/assets/",
      icon: faCube,
    },
    {
      title: "CMS Pages",
      url: "/cms/",
      icon: ["far", "newspaper"],
    },
    ...CmsPages(),
    {
      title: "Projects",
      url: "/projects/",
      icon: faList,
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
          {appPages.map((appPage, index) => {
            if (appPage.isLoading) {
              return (
                <SkeletonLink
                  fontAwesomeMultiplier={FONT_AWESOME_MULTIPLIER}
                  key={index}
                />
              );
            }

            return (
              <IonMenuToggle key={index} autoHide={false}>
                <StyledIonItem
                  color={
                    location.pathname === appPage.url ? "medium" : undefined
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <StyledIonLabel slot="start">
                    {appPage.icon && (
                      <FontAwesomeIcon
                        icon={appPage.icon}
                        size={FONT_AWESOME_MULTIPLIER}
                      />
                    )}
                  </StyledIonLabel>
                  <StyledIonLabel>{appPage.title}</StyledIonLabel>
                </StyledIonItem>
              </IonMenuToggle>
            );
          })}
        </StyledIonList>
      </StyledIonContent>
    </IonMenu>
  );
};

export default Menu;
