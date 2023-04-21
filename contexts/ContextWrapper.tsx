import { ReactNode } from "react";
import { AssetTypeProvider } from "./useAssetTypes";
import { CmsPageProvider } from "./useCMSPages";
import { ProjectDataProvider } from "./useProjectData";
import { ProjectProvider } from "./useProjects";
import { LocationProvider } from "./useRMSLocation";
import { InstanceProvider } from "./useInstances";

/**
 * ContextWrapper
 * This component is a wrapper for all the contexts used in the application.
 * It has been created to avoid having to import all the contexts in the App.tsx file.
 */
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
