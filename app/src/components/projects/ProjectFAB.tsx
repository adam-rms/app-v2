import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonFab, IonFabButton, IonFabList, useIonRouter } from "@ionic/react";
import { useContext } from "react";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";
import { LocationContext } from "../../contexts/utility/LocationContext";
import { useRMSToast } from "../../hooks/useRMSToast";
import AddAssetToProject from "../../utilities/barcode/AddAssetToProject";
import GetAssetFromBarcode from "../../utilities/barcode/GetAssetFromBarcode";

/**
 * Floating action buttons for Projects
 */
const ProjectFab = () => {
  const router = useIonRouter();
  const [present] = useRMSToast();
  const { projectData } = useContext(ProjectDataContext);
  const { location, getLocation } = useContext(LocationContext);

  //Define actual button functions here, that then call utility functions
  /**
   * Redirect to Asset
   * Scans a barcode and then goes to that asset
   */
  const redirectToAsset = async () => {
    const asset = await GetAssetFromBarcode(location);
    if (asset) {
      router.push("/assets/" + asset.assetTypes_id + "/" + asset.assets_id);
    } else {
      if (location.value) {
        //if there is a valid location, the asset couldn't be found
        present("Asset Not found");
      } else {
        present("Please set your location");
      }
    }
  };

  /**
   * "Supermarket Sweep"
   * Adds Asset to current project
   * Scan asset and it's added to project
   */
  const addAsset = async () => {
    if (projectData) {
      const result = await AddAssetToProject(
        projectData.project.projects_id,
        location,
      );

      if (result) {
        if (typeof result === "string") {
          //we've got an error message
          present(result);
        } else {
          //successfully added
          present("Added to " + projectData.project.projects_name);
        }
      } else {
        if (location.value) {
          //if there is a valid location, the asset couldn't be found
          present("There was an error adding this asset");
        } else {
          present("Please set your location");
        }
      }
    } else {
      //we don't have a project so something has gone very wrong!
      throw new Error("addAsset() can only be called within a project");
    }
  };

  const setLocation = async () => {
    const thisLocation = await getLocation();
    present(thisLocation.name);
  };

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton color="light">
        <FontAwesomeIcon icon="shopping-basket" />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton onClick={redirectToAsset}>
          <FontAwesomeIcon icon="search" />
        </IonFabButton>
        <IonFabButton onClick={setLocation}>
          <FontAwesomeIcon icon="map-pin" />
        </IonFabButton>
        {projectData && (
          <IonFabButton onClick={addAsset}>
            <FontAwesomeIcon icon="shopping-cart" />
          </IonFabButton>
        )}
      </IonFabList>
    </IonFab>
  );
};

export default ProjectFab;
