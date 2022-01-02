import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonTitle,
  IonPopover,
  IonContent,
} from "@ionic/react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";
import Page from "../../components/Page";
import { baseURL } from "../../utilities/Api";
import Refresher from "../../components/Refresher";
import { MassFormatter } from "../../utilities/Formatters";
import { StyledText, StyledH5 } from "../../components/styled/Typography";

/**
 * Project Page
 * Lists project details
 */
const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projectData, refreshProjectData } = useContext(ProjectDataContext);

  const doRefresh = (event: CustomEvent) => {
    refreshProjectData(parseInt(projectId)).then(() => {
      event.detail.complete();
    });
  };

  //get individual project data
  useEffect(() => {
    refreshProjectData(parseInt(projectId));
  }, [projectId]);

  //Check project name
  let project_name = "AdamRMS Project";
  if (projectData.project && projectData.project.projects_name) {
    project_name = projectData.project.projects_name;
  }

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
    <Page title={project_name}>
      <Refresher onRefresh={doRefresh} />

      {/* Project Data*/}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            {projectData.project.projects_description}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonRow>
            <IonCol>
              <IonItem>
                <div className="container">
                  <IonCardSubtitle>Project Manager</IonCardSubtitle>
                  {projectData.project.projects_manager ? (
                    <IonCardTitle>
                      {projectData.project.users_name1}{" "}
                      {projectData.project.users_name2}
                    </IonCardTitle>
                  ) : (
                    <IonCardTitle>Unknown</IonCardTitle>
                  )}
                </div>
              </IonItem>
              {projectData.project.projectsTypes_config_client && (
                <IonItem>
                  <div className="container">
                    <IonCardSubtitle>Client</IonCardSubtitle>
                    {projectData.project.clients_id ? (
                      <IonCardTitle>
                        {projectData.project.clients_name}
                      </IonCardTitle>
                    ) : (
                      <IonCardTitle>Unknown</IonCardTitle>
                    )}
                  </div>
                </IonItem>
              )}
              {projectData.project.projectsTypes_config_venue && (
                <IonItem>
                  <div className="container">
                    <IonCardSubtitle>Venue</IonCardSubtitle>
                    {projectData.project.clients_id ? (
                      <IonCardTitle>
                        {projectData.project.locations_name}
                      </IonCardTitle>
                    ) : (
                      <IonCardTitle>Unknown</IonCardTitle>
                    )}
                  </div>
                </IonItem>
              )}
            </IonCol>
            <IonCol>
              <IonItem>
                <div className="container">
                  <IonCardSubtitle>Event Dates</IonCardSubtitle>
                  {projectData.project.projects_dates_use_start ? (
                    <IonCardTitle>
                      {projectData.project.projects_dates_use_start} -{" "}
                      {projectData.project.projects_dates_use_end}
                    </IonCardTitle>
                  ) : (
                    <IonCardTitle>Unknown</IonCardTitle>
                  )}
                </div>
              </IonItem>
              <IonItem>
                <div className="container">
                  <IonCardSubtitle>Dates assets in use</IonCardSubtitle>
                  {projectData.project.projects_dates_deliver_start ? (
                    <IonCardTitle>
                      {projectData.project.projects_dates_deliver_start} -{" "}
                      {projectData.project.projects_dates_deliver_end}
                    </IonCardTitle>
                  ) : (
                    <IonCardTitle>Unknown</IonCardTitle>
                  )}
                </div>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonCardContent>
      </IonCard>

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
              {MassFormatter(projectData.FINANCIALS.mass)})
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
            routerLink={"/projects/" + projectId + "/assets"}
            expand="block"
          >
            View Project Assets
          </IonButton>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Project Crew</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            {projectData.project.crewAssignments &&
            projectData.project.crewAssignments.length > 0 ? (
              projectData.project.crewAssignments.map((item: any) => {
                return (
                  <IonItem key={item.crewAssignments_id}>
                    <IonLabel>
                      {item.users_name1} {item.users_name2}
                      <StyledText>{item.crewAssignments_role}</StyledText>
                    </IonLabel>
                    {item.crewAssignments_comment && (
                      <>
                        <IonButton id={item.crewAssignments_id + "-comment"}>
                          <FontAwesomeIcon icon="question-circle" size="2x" />
                        </IonButton>

                        <IonPopover
                          trigger={item.crewAssignments_id + "-comment"}
                          side="left"
                          translucent={true}
                        >
                          <IonContent className="ion-padding ion-text-center">
                            <IonTitle>{item.crewAssignments_role}</IonTitle>
                            {item.crewAssignments_comment}
                          </IonContent>
                        </IonPopover>
                      </>
                    )}
                  </IonItem>
                );
              })
            ) : (
              <IonItem key="noCrew">
                <IonTitle>No Crew Assigned</IonTitle>
              </IonItem>
            )}
          </IonList>
          <IonButton
            href={baseURL + "project/crew/vacancies.php"}
            target="_system"
            expand="block"
          >
            Signup
          </IonButton>
        </IonCardContent>
      </IonCard>
    </Page>
  );
};

export default Project;
