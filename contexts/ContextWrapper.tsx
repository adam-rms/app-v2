import { ReactNode } from "react";
import { AssetTypeProvider } from "./useAssetTypes";
import { CmsPageProvider } from "./useCMSPages";
import { ProjectDataProvider } from "./useProjectData";
import { ProjectProvider } from "./useProjects";
import { LocationProvider } from "./useRMSLocation";

const ContextWrapper = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <LocationProvider>
      <ProjectProvider>
        <ProjectDataProvider>
          <CmsPageProvider>
            <AssetTypeProvider>{children}</AssetTypeProvider>
          </CmsPageProvider>
        </ProjectDataProvider>
      </ProjectProvider>
    </LocationProvider>
  );
};

export default ContextWrapper;
