import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonList,
  IonRow,
  IonCol,
  IonTitle,
  IonItem,
  IonCardSubtitle,
} from "@ionic/react";

interface AssetInformationProps {
  assetType: IAssetTypeData;
  asset: IAsset;
}

/**
 * All the information about an asset
 */
const AssetInformation: React.FC<AssetInformationProps> = ({
  assetType,
  asset,
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Asset Information</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonText>{asset.assets_notes}</IonText>
        <IonList>
          <IonRow>
            <IonCol>
              <IonTitle>Asset Type Overrides</IonTitle>
              <IonItem>
                <div className="container">
                  <IonCardSubtitle>Mass</IonCardSubtitle>
                  <IonCardTitle>
                    {asset.assets_mass ? asset.assets_mass_format : ""}
                  </IonCardTitle>
                </div>
              </IonItem>
              <IonItem>
                <div className="container">
                  <IonCardSubtitle>value</IonCardSubtitle>
                  <IonCardTitle>
                    {asset.assets_value ? asset.assets_value_format : ""}
                  </IonCardTitle>
                </div>
              </IonItem>
              <IonItem>
                <div className="container">
                  <IonCardSubtitle>Day Rate</IonCardSubtitle>
                  <IonCardTitle>
                    {asset.assets_dayRate ? asset.assets_dayRate_format : ""}
                  </IonCardTitle>
                </div>
              </IonItem>
              <IonItem>
                <div className="container">
                  <IonCardSubtitle>Week Rate</IonCardSubtitle>
                  <IonCardTitle>
                    {asset.assets_weekRate ? asset.assets_weekRate_format : ""}
                  </IonCardTitle>
                </div>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonTitle>Definable Fields</IonTitle>
              {assetType.fields.map((element: any, index: number) => {
                const field = ("asset_definableFields_" +
                  index) as keyof IAsset;
                if (assetType.fields[index - 1] !== "" && asset[field] !== "") {
                  return (
                    <IonItem key={index}>
                      <div className="container">
                        <IonCardSubtitle>
                          {assetType.fields[index - 1]}
                        </IonCardSubtitle>
                        <IonCardTitle>{asset[field]}</IonCardTitle>
                      </div>
                    </IonItem>
                  );
                }
              })}
            </IonCol>
          </IonRow>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default AssetInformation;
