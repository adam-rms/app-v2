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
import { useContext } from "react";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";

/**
 * Available Crew Roles card for Project in current context
 * @returns {JSX.Element}
 */
const ProjectCrewRoles = () => {
  const { projectCrewRoles } = useContext(ProjectDataContext);

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
                  {role.application === null ? (
                    <IonButton
                      routerLink={
                        "/projects/crew/" +
                        role.projectsVacantRoles_id +
                        "/apply"
                      }
                    >
                      Apply
                    </IonButton>
                  ) : (
                    <IonButton disabled>Applied</IonButton>
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

export default ProjectCrewRoles;
