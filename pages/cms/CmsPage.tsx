import { useEffect, useState } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import SkeletonCard from "../../components/SkeletonCard";
import useCMSPages from "../../contexts/useCMSPages";
import { RMSDrawerParamList } from "../../utilities/Routing";
import { Box, Divider, Heading, Text, VStack } from "native-base";
import Card from "../../components/Card";
import ScrollContainer from "../../components/ScrollContainer";
import { RefreshControl } from "react-native";
import RenderHTML, { useContentWidth } from "react-native-render-html";

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
  danger: "red.500",
  warning: "warning",
  info: "secondary",
  light: "light",
  dark: "dark",
};

/**
 * CMS Page
 * Displays a single CMS Page
 * @author Robert-Watts
 */
const CmsPage = ({
  route,
  navigation,
}: DrawerScreenProps<RMSDrawerParamList, "CmsPage">) => {
  const { pageId } = route.params;
  const { CmsContent, getPage } = useCMSPages();
  const [isLoading, setIsLoading] = useState(false);
  const width = useContentWidth() - 20;
  /**
   * Get the page data while setting the isLoading flag
   */
  async function getPageData(pageId: number) {
    setIsLoading(true);
    await getPage(pageId);
    setIsLoading(false);
  }

  /**
   * Refresh the page
   * @param event the refresh event
   */
  async function doRefresh(event?: CustomEvent) {
    await getPageData(pageId);
    if (event) {
      event.detail.complete();
    }
  }

  //Get data from API
  useEffect(() => {
    getPageData(pageId);
  }, [pageId]);

  //filter by requested asset type
  const cmsPage = CmsContent.find(
    (element: CmsContent) => element.cmsPages_id == pageId,
  );

  // Setup variables for the content and title
  let content = null;
  let title = "";

  // If there is data for the CMS page and there are cards on the page
  if (
    cmsPage &&
    cmsPage.DRAFTS &&
    typeof cmsPage.DRAFTS.cmsPagesDrafts_dataARRAY.cards != "undefined"
  ) {
    const cards = cmsPage.DRAFTS.cmsPagesDrafts_dataARRAY.cards;
    title = cmsPage.cmsPages_name;
    content = (
      <VStack>
        {cards.map((card: CmsContentCard, index: number) => {
          if (card.type == "custom") {
            // The CMS page endpoint only returns card data for custom cards currently, so we can only display custom cards
            const background =
              card.outline == "false" && card.color
                ? CARD_COLOR_MAP[card.color]
                : "white";
            const border =
              card.outline == "true" && card.color
                ? CARD_COLOR_MAP[card.color]
                : "gray.300";
            return (
              <Card borderColor={border} size={12} key={index} height="1/2">
                <VStack w="full" h="full">
                  <Box w="full" bg={background}>
                    <Heading mx="auto" pt="2" pb="1">
                      {card.title}
                    </Heading>
                  </Box>
                  <Divider bg={border} />
                  <RenderHTML
                    contentWidth={width}
                    source={{
                      html: card.content.replace(/(\r\n|\n|\r)/gm, ""),
                    }}
                  />
                </VStack>
              </Card>
            );
          }
        })}
      </VStack>
    );
  }

  // If the previous condition is not true (meaning we have not content to display),
  // and we are not loading there must not be any content or the api call must have failed
  else if (!isLoading) {
    title = "Error";
    content = (
      <Card p="2">
        <Heading mx="auto">There was an error!</Heading>
        <Divider />
        <Text>
          We could not find any content for this page. This may mean there is no
          content or that there is a network error. Please try again later
        </Text>
      </Card>
    );
  }

  // If the previous two conditions are not true we must be loading from the api
  else {
    title = "Loading...";
    content = <SkeletonCard />;
  }

  navigation.setOptions({ title: title });
  return (
    <ScrollContainer
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={doRefresh} />
      }
    >
      {content}
    </ScrollContainer>
  );
};

export default CmsPage;
