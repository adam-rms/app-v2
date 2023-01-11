import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonPopover,
  IonContent,
  IonTitle,
} from "@ionic/react";
import { StyledText } from "../styled/Typography";
import { useContext } from "react";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";

const ProjectCrew = () => {
  const { projectData } = useContext(ProjectDataContext);

  if (
    projectData.project.crewAssignments &&
    projectData.project.crewAssignments.length > 0
  ) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Project Crew</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            {projectData.project.crewAssignments.map((item: any) => {
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
            })}
          </IonList>
        </IonCardContent>
      </IonCard>
    );
  } else {
    return null;
  }
};

export default ProjectCrew;
