import { useNavigation, NavigationProp } from "@react-navigation/native";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Accordion, Button } from "native-base";
import AssetItemInformation from "./AssetItemInformation";
import { RMSDrawerParamList } from "../../utilities/Routing";

interface IAssetItemProps {
  AssetTypeId: number;
  assetID: number;
  item: any;
  subHire?: boolean; //No link if is a subhire
}

const AssetItem = (props: IAssetItemProps) => {
  return <></>;
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  return (
    <Accordion key={props.assetID}>
      <Accordion.Summary>
        <IonLabel>{props.item.assets_tag}</IonLabel>
      </Accordion.Summary>
      <IonList slot="content">
        <AssetItemInformation item={props.item} />
        {!props.subHire && (
          <IonItem>
            <Button
              onPress={() => {

              }}
              routerLink={"/assets/" + props.AssetTypeId + "/" + props.assetID}
              size="default"
              slot="end"
            >
              View Asset
              <div slot="end" className="ion-padding-start">
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
              </div>
            </IonButton>
          </IonItem>
        )}
      </IonList>
    </IonAccordion>
  );
};

export default AssetItem;
