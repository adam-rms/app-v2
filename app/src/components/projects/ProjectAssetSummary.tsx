import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { useContext } from "react";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";
import { StyledText, StyledH5 } from "../Typography";

const ProjectAssetSummary = () => {
  const { projectData } = useContext(ProjectDataContext);

  let numAssetTypes = 0;
  if (projectData.FINANCIALS.assetsAssigned) {
    numAssetTypes += Object.keys(projectData.FINANCIALS.assetsAssigned).length;
  }
  if (projectData.FINANCIALS.assetsAssignedSUB) {
    numAssetTypes += Object.keys(
      projectData.FINANCIALS.assetsAssignedSUB,
    ).length;
  }
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Project Assets</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="ion-margin-horizontal">
          <StyledText>
            {numAssetTypes} Asset Type
            {numAssetTypes != 1 ? "s" : ""} assigned to{" "}
            {projectData.project.projects_name} (
            {projectData.FINANCIALS.formattedMass})
          </StyledText>
          {projectData.FINANCIALS && projectData.FINANCIALS.priceMaths && (
            <>
              <StyledH5>Hire Charges</StyledH5>
              <StyledText>
                Days: {projectData.FINANCIALS.priceMaths.days}
                <br />
                Weeks: {projectData.FINANCIALS.priceMaths.weeks}
              </StyledText>
              <StyledText>
                {projectData.FINANCIALS.priceMaths.string}
              </StyledText>
            </>
          )}
        </div>
        <IonButton
          className="ion-margin-vertical"
          routerLink={
            "/projects/" + projectData.project.projects_id + "/assets"
          }
          expand="block"
        >
          View Project Assets
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ProjectAssetSummary;
