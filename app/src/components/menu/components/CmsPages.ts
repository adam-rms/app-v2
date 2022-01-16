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
  }, [refreshPages]);

  // If loading then return some skeletons
  if (isLoading) {
    return [
      {
        type: "section",
        title: "Pages",
      },
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

  const pages: MenuItem[] = [];
  if (CmsPages) {
    //add a section
    pages.push({
      type: "section",
      title: "Pages",
    });
    //Map the pages to the url, icon and title for use in the menu
    CmsPages.forEach((page: any) => {
      pages.push({
        type: "route",
        url: `/cms/${page.cmsPages_id}/`,
        title: page.cmsPages_name,
        ...(page.cmsPages_fontAwesome && {
          icon: GenerateIconFromString(page.cmsPages_fontAwesome),
        }),
      });
    });
  }

  return pages;
};

export default CmsPages;
