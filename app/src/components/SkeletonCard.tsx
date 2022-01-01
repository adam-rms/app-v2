import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import StyledIonSkeletonText from "./StyledIonSkeletonText";

/**
 * Creates an Ionic card with a skeleton text title and
 * 6 skeleton text items to form a "paragraph"
 */
const SkeletonCard: React.FC = () => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          <StyledIonSkeletonText animated />
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <StyledIonSkeletonText animated />
        <StyledIonSkeletonText animated />
        <StyledIonSkeletonText animated />
        <StyledIonSkeletonText animated />
        <StyledIonSkeletonText animated />
        <StyledIonSkeletonText animated style={{ width: "40%" }} />
      </IonCardContent>
    </IonCard>
  );
};

export default SkeletonCard;
