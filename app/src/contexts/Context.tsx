import AssetTypeProvider from "./asset/AssetTypeContext";
import ProjectProvider from "./project/ProjectContext";
import ProjectDataProvider from "./project/ProjectDataContext";
import LocationProvider from "./utility/LocationContext";

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
            <LocationProvider>{props.children}</LocationProvider>
          </ProjectDataProvider>
        </ProjectProvider>
      </AssetTypeProvider>
    </>
  );
}
