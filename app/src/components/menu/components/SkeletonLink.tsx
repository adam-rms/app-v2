import StyledIonItem from "./StyledIonItem";
import { IonSkeletonText } from "@ionic/react";
import StyledIonLabel from "./StyledIonLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";

type SkeletonLinkType = {
  fontAwesomeMultiplier?: SizeProp | undefined;
};

/**
 * Create a skeleton link for the menu
 *
 * @param fontAwesomeMultiplier the size of font awesome icons being used in the menu
 * @constructor
 */
const SkeletonLink: React.FC<SkeletonLinkType> = ({
  fontAwesomeMultiplier = "1x",
}) => {
  return (
    <StyledIonItem lines="none" detail={false}>
      <StyledIonLabel slot="start">
        <IconContainer>
          <FontAwesomeIcon
            icon={"square"}
            size={fontAwesomeMultiplier}
            color={"transparent"}
          />
          <StyledIonSkeletonText animated />
        </IconContainer>
      </StyledIonLabel>
      <StyledIonLabel>
        <IonSkeletonText animated />
      </StyledIonLabel>
    </StyledIonItem>
  );
};

const StyledIonSkeletonText = styled(IonSkeletonText)`
  line-height: inherit;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const IconContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export default SkeletonLink;
