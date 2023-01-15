import {
  IonAccordion,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import AssetItemInformation from "./AssetItemInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IAssetItemProps {
  AssetTypeId: number;
  assetID: number;
  item: any;
  subHire?: boolean; //No link if is a subhire
}

const AssetItem = (props: IAssetItemProps) => {
  return (
    <IonAccordion value={String(props.assetID)} key={props.assetID}>
      <IonItem slot="header">
        <IonLabel>{props.item.assets_tag}</IonLabel>
      </IonItem>
      <IonList slot="content">
        <AssetItemInformation item={props.item} />
        {!props.subHire && (
          <IonItem>
            <IonButton
              routerLink={"/assets/" + props.AssetTypeId + "/" + props.assetID}
              size="default"
              slot="end"
            >
              View Asset
              <div slot="end" className="ion-padding-start">
                <FontAwesomeIcon icon="chevron-right"></FontAwesomeIcon>
              </div>
            </IonButton>
          </IonItem>
        )}
      </IonList>
    </IonAccordion>
  );
};

export default AssetItem;
