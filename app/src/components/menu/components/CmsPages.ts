import { useContext, useEffect, useState } from "react";
import { CmsPageContext } from "../../../contexts/cms/CmsPageContext";
import { AppPage } from "../Menu";
import GenerateIconFromString from "../../../utilities/GenerateIconFromString";

/**
 * Gets the CMS page data from the api and converts it to a format for the menu
 */
const CmsPages = () => {
  const { CmsPages, refreshPages } = useContext(CmsPageContext);
  const [isLoading, setIsLoading] = useState(false);

  //Get data from API
  useEffect(() => {
    setIsLoading(true);
    refreshPages().then(() => {
      setIsLoading(false);
    });
  }, []);

  // If loading then return some skeletons
  if (isLoading) {
    return [
      {
        url: undefined,
        isLoading: true,
      },
      {
        url: undefined,
        isLoading: true,
      },
    ];
  }

  //Map the pages to the url, icon and title for use in the menu
  return CmsPages.map(function (page: CmsPageList): AppPage {
    return {
      url: `/cms/${page.cmsPages_id}/`,
      title: page.cmsPages_name,
      ...(page.cmsPages_fontAwesome && {
        icon: GenerateIconFromString(page.cmsPages_fontAwesome),
      }),
    };
  });
};

export default CmsPages;
