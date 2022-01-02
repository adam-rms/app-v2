import styled from "styled-components";
import { IonItem } from "@ionic/react";

const StyledIonItem = styled(IonItem)`
  ion-menu.md & {
    --padding-start: 10px;
    --padding-end: 10px;
    border-radius: 4px;
  }

  ion-menu.ios & {
    --padding-start: 16px;
    --padding-end: 16px;
    --min-height: 50px;
  }
`;

export default StyledIonItem;
