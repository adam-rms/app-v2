// CMS Pages

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import Api from "../utilities/Api";

/** Parameters returned from the context
 * @see useAssetTypes
 */
interface CMSPageContextType {
  CmsPages: ICmsPageProvider;
  CmsContent: ICmsContentProvider;
  refreshPages: () => void;
  getPage: (id: number) => void;
}

// The actual context
export const CmsPageContext = createContext<CMSPageContextType>(
  {} as CMSPageContextType,
);

//Create a provider wrapper to make the interaction with the context easier
export const CmsPageProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  //Create default state for the page list (used in menus etc)
  const [CmsPages, setCmsPages] = useState<ICmsPageProvider>([]);

  //Create default state for the page content (used when displaying a page)
  const [CmsContent, setCmsContent] = useState<ICmsContentProvider>([]);

  /**
   * Refresh Context
   * Replace pages in context
   */
  async function refreshPages() {
    setCmsPages(await Api("cms/list.php"));
  }

  /**
   * Get or refresh the content of a page
   */
  async function getPage(id: number) {
    setCmsContent([
      ...CmsContent.filter((page: CmsContent) => page.cmsPages_id != id),
      await Api("cms/get.php", { p: id }),
    ]);
  }

  //Memoize the context to prevent unnecessary re-renders
  const memoizedValue = useMemo(
    () => ({
      CmsPages,
      CmsContent,
      refreshPages,
      getPage,
    }),
    [CmsPages, CmsContent],
  );

  return (
    <CmsPageContext.Provider value={memoizedValue}>
      {children}
    </CmsPageContext.Provider>
  );
};

export default function useCMSPages() {
  return useContext(CmsPageContext);
}
