import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { DateTime } from "luxon";
import { RedSpan, Timeline } from "./Timeline";
import { useContext } from "react";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";

const ProjectComments = () => {
  const { projectComments } = useContext(ProjectDataContext);

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

    return (
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
  } else {
    return null;
  }
};

export default ProjectComments;
