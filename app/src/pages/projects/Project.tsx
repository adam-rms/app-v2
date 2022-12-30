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
import Refresher from "../../components/Refresher";
import { RedSpan, Timeline } from "../../components/projects/Timeline";
import { DateTime } from "luxon";

/**
 * Project Page
 * Lists project details
 */
const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projectData, projectComments, refreshProjectData } =
    useContext(ProjectDataContext);
  const baseURL = localStorage.getItem("baseURL");

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

  let comments;
  //add a comment card
  if (projectComments && projectComments.length > 0) {
    const commentsList: JSX.Element[] = [];
    let currentDate: string;
    projectComments.forEach((comment: IComment) => {
      //check if this date is same as previous
      const commentDate = DateTime.fromSQL(
        comment.auditLog_timestamp,
      ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
      if (commentDate != currentDate) {
        //add a date label
        commentsList.push(
          <div className="time-label" key={comment.auditLog_id + "-date"}>
            <RedSpan>{commentDate}</RedSpan>
          </div>,
        );
        currentDate = commentDate;
      }
      commentsList.push(
        <div key={comment.auditLog_id}>
          <FontAwesomeIcon icon={["far", "comment"]} />
          <div className="timeline-item">
            <span className="time">
              <FontAwesomeIcon icon="clock" />{" "}
              {DateTime.fromSQL(comment.auditLog_timestamp).toLocaleString(
                DateTime.TIME_WITH_SECONDS,
              )}
            </span>
            <h3 className="timeline-header">
              <a href={"mailto:" + comment.users_email}>
                {comment.users_name1 + " " + comment.users_name2}
              </a>{" "}
              Commented
            </h3>
            <div
              className="timeline-body"
              dangerouslySetInnerHTML={{ __html: comment.auditLog_actionData }}
            />
          </div>
        </div>,
      );
    });

    comments = (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Project Comments</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <Timeline>
            {commentsList}
            <div>
              {/* End with a clock to show "now" */}
              <FontAwesomeIcon
                icon={["fas", "clock"]}
                style={{ backgroundColor: "#6c757d" }}
              />
            </div>
          </Timeline>
        </IonCardContent>
      </IonCard>
    );
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

      {comments}
    </Page>
  );
};

export default Project;
