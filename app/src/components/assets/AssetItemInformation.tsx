import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from "@ionic/react";

interface IAssetItemInformationProps {
  item: {
    status: string;
    latestScan?: {
      locations_name?: string;
      assetTypes_name?: string;
      assetsBarcodes_customLocation?: string;
    };
    formattedMass: string;
    formattedPrice: string;
    formattedDiscountPrice: string;
    [key: string]: any; //Allow any other properties
  };
}

const AssetItemInformation = (props: IAssetItemInformationProps) => {
  return (
    <IonItem lines="none">
      <IonGrid>
        <IonRow>
          <IonCol size="6" sizeMd="3">
            <b>Status</b>
            <IonLabel>
              {props.item.status}
              {props.item.latestScan && "/"}

              {/*Location Scan*/}
              {props.item.latestScan && props.item.latestScan.locations_name && (
                <span
                  className="badge badge-default"
                  title="GPS Not Verified, but location barcode scanned"
                >
                  <FontAwesomeIcon icon={["fas", "map-marker-alt"]} />
                </span>
              )}
              {props.item.latestScan && props.item.latestScan.assetTypes_name && (
                <span
                  className="badge badge-info"
                  title="Asset Scan was Verified"
                >
                  <FontAwesomeIcon icon={["fas", "check"]} />
                </span>
              )}
              {props.item.latestScan &&
                props.item.latestScan.assetsBarcodes_customLocation && (
                  <span
                    className="badge badge-danger"
                    title="Location was entered as text"
                  >
                    <FontAwesomeIcon icon={["fas", "times"]} />
                  </span>
                )}
            </IonLabel>
          </IonCol>
          <IonCol size="6" sizeMd="3">
            <b>Mass</b>
            <IonLabel>{props.item.formattedMass}</IonLabel>
          </IonCol>
          <IonCol size="6" sizeMd="3">
            <b>Price</b>
            <IonLabel>{props.item.formattedPrice}</IonLabel>
          </IonCol>
          <IonCol size="6" sizeMd="3">
            <b>Discount Price</b>
            <IonLabel>{props.item.formattedDiscountPrice}</IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};
export default AssetItemInformation;
