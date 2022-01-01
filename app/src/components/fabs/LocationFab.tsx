import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonFabButton } from "@ionic/react";
import { useContext } from "react";
import { LocationContext } from "../../contexts/utility/LocationContext";
import { useRMSToast } from "../../hooks/useRMSToast";

const LocationFab = () => {
  const [present] = useRMSToast();
  const { getLocation } = useContext(LocationContext);

  const setLocation = async () => {
    const thisLocation = await getLocation();
    present(thisLocation.name);
  };

  return (
    <IonFabButton onClick={setLocation}>
      <FontAwesomeIcon icon="map-pin" />
    </IonFabButton>
  );
};

export default LocationFab;
