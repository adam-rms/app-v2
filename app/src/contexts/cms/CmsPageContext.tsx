import { createContext, useState } from "react";
import Api from "../../utilities/Api";

// The actual context
export const CmsPageContext = createContext<any>(null);

//Create a provider wrapper to make the interaction with the context easier
const CmsPageProvider: React.FC<React.ReactNode> = ({ children }) => {
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
      await Api("cms/get.php", { p: id }, "POST"),
    ]);
  }

  return (
    <CmsPageContext.Provider
      value={{ CmsPages, CmsContent, refreshPages, getPage }}
    >
      {children}
    </CmsPageContext.Provider>
  );
};

export default CmsPageProvider;
