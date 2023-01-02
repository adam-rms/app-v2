import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRow,
  IonCol,
  IonItem,
  IonCardSubtitle,
} from "@ionic/react";
import { useContext } from "react";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";

const ProjectOverview = () => {
  const { projectData } = useContext(ProjectDataContext);
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{projectData.project.projects_description}</IonCardTitle>
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
  );
};

export default ProjectOverview;
