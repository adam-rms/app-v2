import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonFabButton } from "@ionic/react";
import { useContext } from "react";
import { LocationContext } from "../../contexts/utility/LocationContext";

const LocationFab = () => {
  const { getLocation } = useContext(LocationContext);

  return (
    <IonFabButton onClick={getLocation}>
      <FontAwesomeIcon icon="map-pin" />
    </IonFabButton>
  );
};

export default LocationFab;
