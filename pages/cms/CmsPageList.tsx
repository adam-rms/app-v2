import { useEffect, useState } from "react";
import { Box, Container, Heading } from "native-base";
import GenerateIconFromString from "../../utilities/GenerateIconFromString";
import useCMSPages from "../../contexts/useCMSPages";
import NavList, { NavListItemType } from "../../components/NavList";
import Card from "../../components/Card";
import ScrollContainer from "../../components/ScrollContainer";
import { RefreshControl } from "react-native-gesture-handler";

// Font Awesome - for this page *only*
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
//We need the entire solid library for this page as we don't know what icon we'll need
library.add(fas);

/**
 * CMS Page List
 * Displays a single CMS Page
 */
const CmsPageList = () => {
  const { CmsPages, refreshPages } = useCMSPages();
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
          id: page.cmsPages_id,
          link: "CmsPage",
          linkAttributes: { pageId: page.cmsPages_id },
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

  return (
    <Container>
      {CmsPages.length == 0 && !isLoading ? (
        <Card>
          <ScrollContainer
            refreshControl={
              <RefreshControl onRefresh={doRefresh} refreshing={isLoading} />
            }
          >
            <Box h="full" alignItems="center">
              <Heading my="2">No Projects Found</Heading>
            </Box>
          </ScrollContainer>
        </Card>
      ) : (
        <NavList
          items={generateListItems(CmsPages)}
          isLoading={!CmsPages && isLoading}
          onRefresh={doRefresh}
        />
      )}
    </Container>
  );
};

export default CmsPageList;
