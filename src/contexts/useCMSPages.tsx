// CMS Pages

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import Api from "@utility/Api";
import { useToast } from "native-base";

/** Parameters returned from the context
 * @see useAssetTypes
 */
interface CMSPageContextType {
  CmsPages: ICmsPageProvider;
  CmsContent: ICmsContentProvider;
  refreshPages: () => Promise<void>;
  getPage: (id: number) => Promise<void>;
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
  const toast = useToast();
  //Create default state for the page list (used in menus etc)
  const [CmsPages, setCmsPages] = useState<ICmsPageProvider>([]);

  //Create default state for the page content (used when displaying a page)
  const [CmsContent, setCmsContent] = useState<ICmsContentProvider>([]);

  /**
   * Refresh Context
   * Replace pages in context
   */
  async function refreshPages() {
    const cmsResponse = await Api("cms/list.php");
    if (cmsResponse.result) {
      setCmsPages(cmsResponse.response);
    } else {
      toast.show({
        title: "Error Loading Pages",
        description: cmsResponse.error,
      });
    }
  }

  /**
   * Get or refresh the content of a page
   */
  async function getPage(id: number) {
    const contentResponse = await Api("cms/get.php", { p: id });
    if (contentResponse.result) {
      setCmsContent([
        ...CmsContent.filter((page: CmsContent) => page.cmsPages_id != id),
        contentResponse.response,
      ]);
    } else {
      toast.show({
        title: "Error Loading Page",
        description: contentResponse.error,
      });
    }
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
