import { ReactNode } from "react";
import { AssetTypeProvider } from "./useAssetTypes";
import { CmsPageProvider } from "./useCMSPages";
import { ProjectDataProvider } from "./useProjectData";
import { ProjectProvider } from "./useProjects";
import { LocationProvider } from "./useRMSLocation";
import { InstanceProvider } from "./useInstances";

const ContextWrapper = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <InstanceProvider>
      <LocationProvider>
        <ProjectProvider>
          <ProjectDataProvider>
            <CmsPageProvider>
              <AssetTypeProvider>{children}</AssetTypeProvider>
            </CmsPageProvider>
          </ProjectDataProvider>
        </ProjectProvider>
      </LocationProvider>
    </InstanceProvider>
  );
};

export default ContextWrapper;
