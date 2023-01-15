import {
  IonCard,
  IonCardHeader,
  IonText,
  IonCardContent,
  IonRow,
  IonCol,
  IonItem,
  IonCardTitle,
} from "@ionic/react";
import { useContext } from "react";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";

const ProjectOverview = () => {
  const { projectData } = useContext(ProjectDataContext);
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          {projectData.project.projects_description
            ? projectData.project.projects_description
            : ""}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonRow>
          <IonCol size="12" sizeLg="6">
            <IonItem>
              <div className="container">
                <IonText color="medium">
                  <h2>Project Manager</h2>
                </IonText>
                {projectData.project.projects_manager ? (
                  <IonText>
                    {projectData.project.users_name1}{" "}
                    {projectData.project.users_name2}
                  </IonText>
                ) : (
                  <IonText>Unknown</IonText>
                )}
              </div>
            </IonItem>
            {projectData.project.projectsTypes_config_client && (
              <IonItem>
                <div className="container">
                  <IonText color="medium">
                    <h2>Client</h2>
                  </IonText>
                  {projectData.project.clients_id ? (
                    <IonText>{projectData.project.clients_name}</IonText>
                  ) : (
                    <IonText>Unknown</IonText>
                  )}
                </div>
              </IonItem>
            )}
            {projectData.project.projectsTypes_config_venue && (
              <IonItem>
                <div className="container">
                  <IonText color="medium">
                    <h2>Venue</h2>
                  </IonText>
                  {projectData.project.locations_name ? (
                    <IonText>{projectData.project.locations_name}</IonText>
                  ) : (
                    <IonText>Unknown</IonText>
                  )}
                </div>
              </IonItem>
            )}
          </IonCol>
          <IonCol size="12" sizeLg="6">
            <IonItem>
              <div className="container">
                <IonText color="medium">
                  <h2>Project ID</h2>
                </IonText>
                <IonText>{projectData.project.projects_id}</IonText>
              </div>
            </IonItem>
            <IonItem>
              <div className="container">
                <IonText color="medium">
                  <h2>Event Dates</h2>
                </IonText>
                {projectData.project.projects_dates_use_start ? (
                  <IonText>
                    {projectData.project.projects_dates_use_start} -{" "}
                    {projectData.project.projects_dates_use_end}
                  </IonText>
                ) : (
                  <IonText>Unknown</IonText>
                )}
              </div>
            </IonItem>
            <IonItem>
              <div className="container">
                <IonText color="medium">
                  <h2>Dates assets in use</h2>
                </IonText>
                {projectData.project.projects_dates_deliver_start ? (
                  <IonText>
                    {projectData.project.projects_dates_deliver_start} -{" "}
                    {projectData.project.projects_dates_deliver_end}
                  </IonText>
                ) : (
                  <IonText>Unknown</IonText>
                )}
              </div>
            </IonItem>
          </IonCol>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};

export default ProjectOverview;
