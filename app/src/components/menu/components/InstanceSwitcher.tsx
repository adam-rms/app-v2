import { ActionSheetButton, useIonActionSheet } from "@ionic/react";
import type { OverlayEventDetail } from "@ionic/core";
import { useEffect, useState } from "react";
import Api from "../../../utilities/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledIonItem from "./StyledIonItem";
import StyledIonLabel from "./StyledIonLabel";

interface Instance {
  this: boolean;
  instances_name: string;
  permissions: number[];
  instances_id: number;
}

const InstanceSwitcher: React.FC = () => {
  const [present] = useIonActionSheet();
  const [instances, setInstances] = useState<Instance[]>([]);
  const [instanceButtons, setInstanceButtons] = useState<ActionSheetButton[]>(
    [],
  );
  const [result, setResult] = useState<OverlayEventDetail>();

  useEffect(() => {
    Api("instances/list.php").then((response) => {
      console.log(response);
      setInstances(response);
    });
  }, []);

  useEffect(() => {
    const buttons: ActionSheetButton[] = [];
    if (instances) {
      instances.map((instance) => {
        buttons.push({
          text: instance.instances_name,
          data: {
            instance: instance.instances_id,
          },
        });
      });
      buttons.push({
        text: "Cancel",
        role: "cancel",
      });
    }
    setInstanceButtons(buttons);
  }, [instances]);

  useEffect(() => {
    if (result) {
      const data = { instances_id: result?.data?.instance };
      Api("instances/switch.php", data)
        .then(() => {
          location.reload(); // reload the page so the app fetches correct instance data
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [result]);

  return (
    <StyledIonItem
      routerLink=""
      routerDirection="none"
      lines="none"
      detail={false}
      onClick={() => {
        present({
          header: "Change Business",
          buttons: instanceButtons,
          onDidDismiss: ({ detail }) => setResult(detail),
        });
      }}
    >
      <StyledIonLabel slot="start">
        <FontAwesomeIcon icon="building" size="1x" />
      </StyledIonLabel>

      <StyledIonLabel>Change Business</StyledIonLabel>
    </StyledIonItem>
  );
};

export default InstanceSwitcher;
