import AssetTypeProvider from "./asset/AssetTypeContext";
import CmsPageProvider from "./cms/CmsPageContext";
import ProjectProvider from "./project/ProjectContext";
import ProjectDataProvider from "./project/ProjectDataContext";

/**
 * This is used to wrap all contexts into one component.
 * @param props Allows nested components
 * @returns <Context> </Context>
 */
export default function Contexts(props: any) {
  return (
    <>
      <AssetTypeProvider>
        <ProjectProvider>
          <ProjectDataProvider>
            <CmsPageProvider>{props.children}</CmsPageProvider>
          </ProjectDataProvider>
        </ProjectProvider>
      </AssetTypeProvider>
    </>
  );
}
