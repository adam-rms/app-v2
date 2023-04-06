import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import { ProjectCrewRoleProps } from "../../pages/projects/Project";

/**
 * Available Crew Roles card for Project in current context
 */
const ProjectCrewRoles = ({
  projectCrewRoles,
}: ProjectCrewRoleProps): JSX.Element => {
  if (projectCrewRoles && projectCrewRoles.length > 0) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Available Crew Roles</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonList>
            {projectCrewRoles.map((role: IProjectCrewRole) => {
              return (
                <IonItem key={role.projectsVacantRoles_id}>
                  <IonLabel>{role.projectsVacantRoles_name}</IonLabel>
                  <IonButton
                    routerLink={
                      "/projects/crew/" + role.projectsVacantRoles_id + "/apply"
                    }
                  >
                    {role.application === null ? "Apply" : "Applied"}
                  </IonButton>
                </IonItem>
              );
            })}
          </IonList>
        </IonCardContent>
      </IonCard>
    );
  } else {
    return <></>;
  }
};

export default ProjectCrewRoles;
