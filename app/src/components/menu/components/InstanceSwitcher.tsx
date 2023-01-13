import { ActionSheetButton } from "@ionic/react";
import type { OverlayEventDetail } from "@ionic/core";
import Api from "../../../utilities/Api";

interface Instance {
  this: boolean;
  instances_name: string;
  permissions: number[];
  instances_id: number;
}

export const getInstances = async () => {
  const buttons: ActionSheetButton[] = [];
  const response = await Api("instances/list.php");
  if (response) {
    response.map((instance: Instance) => {
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
  return buttons;
};

export const handleInstanceSwitch = (result: OverlayEventDetail) => {
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
};
