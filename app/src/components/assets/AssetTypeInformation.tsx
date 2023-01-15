import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonCard,
  IonCardContent,
  IonRow,
  IonCol,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
} from "@ionic/react";

interface AssetTypeInformationProps {
  assetType: IAssetTypeData;
}

/**
 * Information about the asset type
 */
const AssetTypeInformation: React.FC<AssetTypeInformationProps> = ({
  assetType,
}) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonRow>
          <IonCol>
            <div className="container">
              <IonCardSubtitle>Manufacturer</IonCardSubtitle>
              <IonCardTitle>{assetType.manufacturers_name}</IonCardTitle>
            </div>
            <div className="container">
              <IonCardSubtitle>Category</IonCardSubtitle>
              <IonCardTitle>{assetType.assetCategories_name}</IonCardTitle>
            </div>
            {assetType.assetTypes_productLink && (
              <div className="container">
                <IonCardSubtitle>Product Link</IonCardSubtitle>
                <IonButton
                  href={assetType.assetTypes_productLink}
                  target="_system"
                  className="ion-padding-start"
                >
                  Manufacturer Information
                  <div slot="end">
                    <FontAwesomeIcon icon="chevron-right"></FontAwesomeIcon>
                  </div>
                </IonButton>
              </div>
            )}
          </IonCol>
          <IonCol>
            <div className="container">
              <IonCardSubtitle>Weight</IonCardSubtitle>
              <IonCardTitle>{assetType.assetTypes_mass_format}</IonCardTitle>
            </div>
            <div className="container">
              <IonCardSubtitle>Value</IonCardSubtitle>
              <IonCardTitle>{assetType.assetTypes_value_format}</IonCardTitle>
            </div>
            <div className="container">
              <IonCardSubtitle>Day Rate</IonCardSubtitle>
              <IonCardTitle>{assetType.assetTypes_dayRate_format}</IonCardTitle>
            </div>
            <div className="container">
              <IonCardSubtitle>Week Rate</IonCardSubtitle>
              <IonCardTitle>
                {assetType.assetTypes_weekRate_format}
              </IonCardTitle>
            </div>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default AssetTypeInformation;
