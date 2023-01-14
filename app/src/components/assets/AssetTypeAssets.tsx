import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
} from "@ionic/react";
import AssetItem from "./AssetItem";

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
              <AssetItem
                key={item.assets_id}
                AssetTypeId={assetType.assetTypes_id}
                item={item}
              />
            );
          })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default AssetTypeAssets;
