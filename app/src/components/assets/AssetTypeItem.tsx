import {
  IonAccordion,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonAccordionGroup,
} from "@ionic/react";
import { IProjectAssets } from "../../pages/projects/ProjectAssets";
import AssetItem from "./AssetItem";
import AssetItemInformation from "./AssetItemInformation";

interface IAssetTypeItemProps {
  assetTypeKey: string; //Key
  typedAsset: IProjectAssets;
  subHire?: boolean; //If is subhire, don't link to the asset
}

const AssetTypeItem = (props: IAssetTypeItemProps) => {
  return (
    <IonAccordion value={props.assetTypeKey} key={props.assetTypeKey}>
      <IonItem slot="header">
        <IonLabel>
          {props.typedAsset.assets.length}x{" "}
          {props.typedAsset.assets[0].assetTypes_name}
        </IonLabel>
      </IonItem>
      <IonList slot="content">
        <AssetItemInformation item={props.typedAsset.totals} />
        <IonItem>
          <IonText color="primary">
            <h2>Assets</h2>
          </IonText>
        </IonItem>
        <IonAccordionGroup multiple={true}>
          {
            //generate list of individual assets
            props.typedAsset.assets.map((item: IAsset) => {
              return (
                <AssetItem
                  AssetTypeId={parseInt(props.assetTypeKey)}
                  assetID={item.assets_id}
                  item={item}
                  subHire={props.subHire}
                />
              );
            })
          }
        </IonAccordionGroup>
      </IonList>
    </IonAccordion>
  );
};

export default AssetTypeItem;
