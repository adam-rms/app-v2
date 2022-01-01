import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonFabButton } from "@ionic/react";
import { useContext } from "react";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";
import { LocationContext } from "../../contexts/utility/LocationContext";
import { useRMSToast } from "../../hooks/useRMSToast";
import AddAssetToProject from "../../utilities/barcode/AddAssetToProject";

const SupermarketSweepFab = () => {
  const [present] = useRMSToast();
  const { projectData } = useContext(ProjectDataContext);
  const { location } = useContext(LocationContext);
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

  //make sure there actually is data before showing button
  if (projectData) {
    return (
      <IonFabButton onClick={addAsset}>
        <FontAwesomeIcon icon="shopping-cart" />
      </IonFabButton>
    );
  } else {
    return <></>;
  }
};

export default SupermarketSweepFab;
