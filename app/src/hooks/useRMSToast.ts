import { useIonToast } from "@ionic/react";

export const useRMSToast = () => {
  const [present, dismiss] = useIonToast();

  const newPresent = (message: string) => {
    present(message, 2000);
  };

  return [newPresent, dismiss];
};
