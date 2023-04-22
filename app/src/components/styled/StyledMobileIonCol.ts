import { IonCol } from "@ionic/react";
import styled from "styled-components";

/**
 * Hidden on mobile verision of IonCol
 */
const StyledMobileIonCol = styled(IonCol)`
  @media (max-width: 768px) {
    display: none;
  }
`;

export default StyledMobileIonCol;
