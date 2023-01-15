import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonLabel,
  IonItem,
} from "@ionic/react";

interface AssetTypeAssetsProps {
  assetType: IAssetTypeData;
}

/**
 * All the assets of a particular AssetType
 */
const AssetTypeAssets: React.FC<AssetTypeAssetsProps> = ({ assetType }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Individual Assets</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {assetType.tags.map((item: any) => {
            return (
              <IonItem
                routerLink={
                  "/assets/" + assetType.assetTypes_id + "/" + item.assets_id
                }
                button
                detail={true}
              >
                <IonLabel>{item.assets_tag}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default AssetTypeAssets;
