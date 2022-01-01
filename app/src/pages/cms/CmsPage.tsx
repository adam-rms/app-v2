import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { CmsPageContext } from "../../contexts/cms/CmsPageContext";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonRow,
} from "@ionic/react";
import Page from "../../components/Page";
import StyledIonSkeletonText from "../../components/StyledIonSkeletonText";
import SkeletonCard from "../../components/SkeletonCard";
import SummernoteContent from "../../components/SummernoteContent";
import Refresher from "../../components/Refresher";

/**
 * Takes the output from the dropdown (bootstrap) colour menu in the dashboard and
 * converts it to its Ionic equivalent.
 * Set to undefined if no colour should be applied.
 */
const CARD_COLOR_MAP: CmsCardColorMapType = {
  false: undefined, //No Colour
  primary: "tertiary",
  secondary: "light",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "secondary",
  light: "light",
  dark: "dark",
};

/**
 * CMS Page
 * Displays a single CMS Page
 */
const CmsPage = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const { CmsContent, getPage } = useContext(CmsPageContext);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Get the page data while setting the isLoading flag
   * @param pageId the page id. Can be either a number or string as this is what the api accepts.
   */
  async function getPageData(pageId: number | string) {
    setIsLoading(true);
    await getPage(pageId);
    setIsLoading(false);
  }

  /**
   * Refresh the page
   * @param event the refresh event
   */
  async function doRefresh(event: CustomEvent) {
    await getPageData(pageId).then(() => {
      event.detail.complete();
    });
  }

  //Get data from API
  useEffect(() => {
    getPageData(pageId);
  }, [pageId]);

  //filter by requested asset type
  const cmsPage = CmsContent.find(
    (element: CmsContent) => element.cmsPages_id == parseInt(pageId),
  );

  // Setup variables for the content and title
  let content = null;
  let title;

  // If there is data for the CMS page and there are cards on the page
  if (
    cmsPage &&
    typeof cmsPage.DRAFTS.cmsPagesDrafts_dataARRAY.cards != "undefined"
  ) {
    title = cmsPage.cmsPages_name;
    content = (
      <IonRow>
        {cmsPage.DRAFTS.cmsPagesDrafts_dataARRAY.cards.map(
          (card: CmsContentCard, index: number) => (
            <IonCol size={"12"} sizeLg={card.width} key={index}>
              <IonCard color={card.color && CARD_COLOR_MAP[card.color]}>
                <IonCardHeader>
                  <IonCardTitle>{card.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <SummernoteContent
                    dangerouslySetInnerHTML={{
                      __html: card.content.replace(/(\r\n|\n|\r)/gm, ""),
                    }}
                  />
                </IonCardContent>
              </IonCard>
            </IonCol>
          ),
        )}
      </IonRow>
    );
  }

  // If the previous condition is not true (meaning we have not content to display),
  // and we are not loading there must not be any content or the api call must have failed
  else if (!isLoading) {
    title = "Error";
    content = (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>There was an error!</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          We could not find any content for this page. This may mean there is no
          content or that there is a network error. Please try again later
        </IonCardContent>
      </IonCard>
    );
  }

  // If the previous two conditions are not true we must be loading from the api
  else {
    title = <StyledIonSkeletonText animated />;
    content = <SkeletonCard />;
  }

  return (
    <Page title={title}>
      <Refresher onRefresh={doRefresh} />

      {content}
    </Page>
  );
};

export default CmsPage;
