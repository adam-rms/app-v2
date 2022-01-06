import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonCol, IonGrid, IonItem, IonLabel, IonRow } from "@ionic/react";

const AssetItem = (props: any) => {
  let additionalInfo;
  if (props.item.price) {
    additionalInfo = (
      <>
        <IonCol size="4">
          <IonLabel>
            {/*Status*/}
            {props.item.assetsAssignmentsStatus_name}
            {props.item.assetsAssignmentsStatus_name &&
              props.item.latestScan &&
              "/"}
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
        <IonCol size="1">
          <IonLabel>{props.item.formattedMass}</IonLabel>
        </IonCol>
        <IonCol size="1">
          <IonLabel>{props.item.formattedPrice}</IonLabel>
        </IonCol>
        <IonCol size="1">
          <IonLabel>{props.item.formattedDiscountPrice}</IonLabel>
        </IonCol>
      </>
    );
  } else {
    //Add blank column for formatting
    additionalInfo = <IonCol size="7" />;
  }
  return (
    <IonItem
      routerLink={"/assets/" + props.AssetTypeId + "/" + props.item.assets_id}
    >
      <IonGrid>
        <IonRow>
          <IonCol size="2">
            <IonLabel>
              <h2>{props.item.assets_tag}</h2>
            </IonLabel>
          </IonCol>
          {additionalInfo}
          <IonCol size="3">
            <FontAwesomeIcon
              icon="chevron-right"
              className="ion-margin-end ion-float-end"
            />
            {props.item.flagsblocks["COUNT"]["BLOCK"] > 0 && (
              <FontAwesomeIcon
                icon="ban"
                color="#dc3545"
                className="ion-margin-end ion-float-end"
              />
            )}
            {props.item.flagsblocks["COUNT"]["FLAG"] > 0 && (
              <FontAwesomeIcon
                icon="flag"
                color="#ffc107"
                className="ion-margin-end ion-float-end"
              />
            )}
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default AssetItem;
