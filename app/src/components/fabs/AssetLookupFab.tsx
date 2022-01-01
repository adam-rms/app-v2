import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useIonRouter, IonFabButton } from "@ionic/react";
import { useContext } from "react";
import { LocationContext } from "../../contexts/utility/LocationContext";
import { useRMSToast } from "../../hooks/useRMSToast";
import GetAssetFromBarcode from "../../utilities/barcode/GetAssetFromBarcode";

const AssetLookupFab = () => {
  const router = useIonRouter();
  const [present] = useRMSToast();
  const { location } = useContext(LocationContext);
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

  return (
    <IonFabButton onClick={redirectToAsset}>
      <FontAwesomeIcon icon="search" />
    </IonFabButton>
  );
};

export default AssetLookupFab;
