import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonFab, IonFabButton, IonFabList } from "@ionic/react";
import AssetLookupFab from "../fabs/AssetLookupFab";
import LocationFab from "../fabs/LocationFab";
import SupermarketSweepFab from "../fabs/SupermarketSweepFab";

/**
 * Floating action buttons for Projects
 * Create components in app\src\components\fabs and import here
 */
const ProjectFab = () => {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton color="light">
        <FontAwesomeIcon icon="shopping-basket" />
      </IonFabButton>
      <IonFabList side="top">
        <AssetLookupFab />
        <LocationFab />
        <SupermarketSweepFab />
      </IonFabList>
    </IonFab>
  );
};

export default ProjectFab;
