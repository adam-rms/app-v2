import { useContext, useEffect, useState } from "react";
import { CmsPageContext } from "../../../contexts/cms/CmsPageContext";
import GenerateIconFromString from "../../../utilities/GenerateIconFromString";
import { MenuItem } from "./MenuItem";

/**
 * Gets the CMS page data from the api and converts it to a format for the menu
 */
const CmsPages = (): MenuItem[] => {
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
        type: "item",
        isLoading: true,
      },
      {
        type: "item",
        isLoading: true,
      },
    ];
  }

  //Map the pages to the url, icon and title for use in the menu
  return CmsPages.map(function (page: CmsPageList): MenuItem {
    return {
      type: "route",
      url: `/cms/${page.cmsPages_id}/`,
      title: page.cmsPages_name,
      ...(page.cmsPages_fontAwesome && {
        icon: GenerateIconFromString(page.cmsPages_fontAwesome),
      }),
    };
  });
};

export default CmsPages;
