import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonText,
} from "@ionic/react";
import { useContext } from "react";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";

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
          <p>
            {numAssetTypes} Asset Type
            {numAssetTypes != 1 ? "s" : ""} assigned to{" "}
            {projectData.project.projects_name} (
            {projectData.FINANCIALS.formattedMass})
          </p>
          {projectData.FINANCIALS && projectData.FINANCIALS.priceMaths && (
            <>
              <IonText color="primary">
                <h2>Hire Charges</h2>
              </IonText>
              <p>
                Days: {projectData.FINANCIALS.priceMaths.days}
                <br />
                Weeks: {projectData.FINANCIALS.priceMaths.weeks}
              </p>
              <p>{projectData.FINANCIALS.priceMaths.string}</p>
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
