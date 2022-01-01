import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonFab, IonFabButton, IonFabList } from "@ionic/react";
import AssetLookupFab from "../fabs/AssetLookupFab";
import LocationFab from "../fabs/LocationFab";

/**
 * Floating action buttons for Projects
 * Create components in app\src\components\fabs and import here
 */
const AssetsFab = () => {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton color="light">
        <FontAwesomeIcon icon="info" />
      </IonFabButton>
      <IonFabList side="top">
        <AssetLookupFab />
        <LocationFab />
      </IonFabList>
    </IonFab>
  );
};

export default AssetsFab;
