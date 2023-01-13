import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import Page from "../../components/Page";
import NavList, { NavListItemType } from "../../components/NavList";
import { useContext, useEffect, useState } from "react";
import { CmsPageContext } from "../../contexts/cms/CmsPageContext";
import Refresher from "../../components/Refresher";
import GenerateIconFromString from "../../utilities/GenerateIconFromString";

/**
 * CMS Page List
 * Displays a single CMS Page
 */
const CmsPageList = () => {
  const { CmsPages, refreshPages } = useContext(CmsPageContext);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Refresh the page while setting the isLoading flag
   * @param event the refresh event
   */
  async function doRefresh(event?: CustomEvent) {
    setIsLoading(true);
    await refreshPages();
    setIsLoading(false);
    if (event) event.detail.complete();
  }

  /**
   * Take the raw data from the api call can generate the correct format for the NavList.
   * This uses recursion meaning that there can be an infinite number of sub pages in the nav tree.
   * @param pageArray The page list from the api
   */
  function generateListItems(pageArray: ICmsPageProvider): NavListItemType[] {
    //check if actually given pages
    if (pageArray) {
      return pageArray.map((page: CmsPageList): NavListItemType => {
        return {
          link: `/cms/${page.cmsPages_id}/`,
          content: page.cmsPages_name,
          ...(page.cmsPages_fontAwesome && {
            icon: GenerateIconFromString(page.cmsPages_fontAwesome),
          }),
          ...(page.SUBPAGES && { subItems: generateListItems(page.SUBPAGES) }),
        };
      });
    } else {
      return [];
    }
  }

  //Get data from API
  useEffect(() => {
    doRefresh();
  }, []);

  let content;
  //If there are no pages and there is nothing currently loading
  if (!CmsPages && !isLoading) {
    content = (
      <>
        <IonCardHeader>
          <IonCardTitle>There are no CMS pages!</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>Log in to the dashboard to create some!</IonCardContent>
      </>
    );
  } else {
    // NavList is ued to both generate the items when there is a list and display the skeleton loading when there isn't
    content = (
      <IonCardContent>
        <NavList
          items={generateListItems(CmsPages)}
          isLoading={!CmsPages && isLoading}
        />
      </IonCardContent>
    );
  }

  return (
    <Page title={"CMS Pages"}>
      <Refresher onRefresh={doRefresh} />
      <IonCard>{content}</IonCard>
    </Page>
  );
};

export default CmsPageList;
