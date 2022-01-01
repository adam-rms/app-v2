import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
} from "@ionic/react";

interface RefresherProps {
  onRefresh: ((event: CustomEvent<RefresherEventDetail>) => void) | undefined;
}

/**
 * Creates a standard Ionic Refresher for use in all parts of the project
 * @param onRefresh the function to call on refresh
 * @constructor
 */
const Refresher = ({ onRefresh }: RefresherProps) => {
  return (
    <IonRefresher
      slot="fixed"
      onIonRefresh={onRefresh}
      closeDuration={"280ms"}
      pullFactor={1}
      pullMin={60}
      snapbackDuration={"280ms"}
    >
      <IonRefresherContent />
    </IonRefresher>
  );
};

export default Refresher;
