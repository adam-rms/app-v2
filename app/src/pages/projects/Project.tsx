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
import { LocationContext } from "../../contexts/location/LocationContext";
import Page from "../../components/Page";
import Refresher from "../../components/Refresher";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import AddAssetToProject from "../../utilities/barcode/AddAssetToProject";
import { useRMSToast } from "../../hooks/useRMSToast";

/**
 * Project Page
 * Lists project details
 */
const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projectData, refreshProjectData } = useContext(ProjectDataContext);
  const { getRMSLocation } = useContext(LocationContext);
  const baseURL = localStorage.getItem("baseURL");
  const [present] = useRMSToast();

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

  const buttons = [
    {
      icon: faShoppingCart,
      onClick: () => {
        if (projectData) {
          getRMSLocation(true).then((location: ILocation) => {
            AddAssetToProject(projectData.project.projects_id, location).then(
              (result) => {
                if (result) {
                  if (typeof result === "string") {
                    //we've got an error message
                    present(result);
                  } else {
                    //successfully added
                    present("Added to " + projectData.project.projects_name);
                  }
                } else {
                  if (location.value) {
                    //if there is a valid location, the asset couldn't be found
                    present("There was an error adding this asset");
                  } else {
                    present("Please set your location");
                  }
                }
              },
            );
          });
        }
      },
    },
  ];

  return (
    <Page title={project_name} buttons={buttons}>
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
          <IonButton
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
                      <p>{item.crewAssignments_role}</p>
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
            href={baseURL + "/project/crew/vacancies.php"}
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
