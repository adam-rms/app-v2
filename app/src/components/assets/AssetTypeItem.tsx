import {
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonList,
} from "@ionic/react";
import { IProjectAssets } from "../../pages/projects/ProjectAssets";
import AssetItem from "./AssetItem";

interface IAssetTypeItemProps {
  assetTypeKey: string; //Key
  typedAsset: IProjectAssets;
  subHire?: boolean; //If is subhire, don't link to the asset
}

const AssetTypeItem = (props: IAssetTypeItemProps) => {
  return (
    <IonAccordionGroup multiple={true} key={props.assetTypeKey}>
      <IonAccordion value={props.assetTypeKey}>
        <IonItem slot="header">
          <IonGrid>
            <IonRow>
              <IonCol size="2">
                <IonLabel>
                  {props.typedAsset.assets.length}x{" "}
                  {props.typedAsset.assets[0].assetTypes_name}
                </IonLabel>
              </IonCol>
              <IonCol size="4">{props.typedAsset.totals.status}</IonCol>
              <IonCol size="1">{props.typedAsset.totals.formattedMass}</IonCol>
              <IonCol size="1">{props.typedAsset.totals.formattedPrice}</IonCol>
              <IonCol size="1">
                {props.typedAsset.totals.formattedDiscountPrice}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
        <IonList slot="content">
          {
            //generate list of individual assets
            props.typedAsset.assets.map((item: any) => {
              return (
                <AssetItem
                  key={item.assets_id}
                  AssetTypeId={props.assetTypeKey}
                  item={item}
                  subHire={props.subHire}
                />
              );
            })
          }
        </IonList>
      </IonAccordion>
    </IonAccordionGroup>
  );
};

export default AssetTypeItem;
