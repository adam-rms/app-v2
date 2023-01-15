import { useContext, useEffect, useState } from "react";
import Page from "../../components/Page";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";
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
import SkeletonCard from "../../components/SkeletonCard";

interface crewRole {
  projects_id: number;
  projects_name: string;
  projects_roles: IProjectCrewRole[];
}
const CrewRecruitment = () => {
  const [crewRoles, setCrewRoles] = useState<crewRole[]>([]);
  const { projectCrewRoles, refreshProjectData } =
    useContext(ProjectDataContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    refreshProjectData().then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const roles: crewRole[] = [];
    let projectID = -1;
    if (projectCrewRoles && projectCrewRoles.length > 0) {
      projectCrewRoles.map((role: IProjectCrewRole) => {
        if (projectID != role.projects_id) {
          projectID = role.projects_id;
          roles.push({
            projects_id: role.projects_id,
            projects_name: role.projects_name,
            projects_roles: [role],
          });
        } else {
          const thisrole = roles.find((role) => role.projects_id == projectID);
          if (thisrole) {
            thisrole.projects_roles.push(role);
          }
        }
      });
    }
    setCrewRoles(roles);
  }, [projectCrewRoles]);

  if (projectCrewRoles && projectCrewRoles.length > 0) {
    return (
      <Page title="Crew Vacancies">
        {crewRoles.map((project) => {
          return (
            <IonCard key={project.projects_id}>
              <IonCardHeader>
                <IonCardTitle>{project.projects_name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem lines="none">
                  <IonButton
                    slot="end"
                    fill="outline"
                    size="small"
                    routerLink={"/projects/" + project.projects_id}
                  >
                    Project Information
                  </IonButton>
                </IonItem>
                <IonList>
                  {project.projects_roles.map((role: IProjectCrewRole) => {
                    return (
                      <IonItem key={role.projectsVacantRoles_id}>
                        <IonLabel>{role.projectsVacantRoles_name}</IonLabel>
                        <IonButton
                          routerLink={
                            "/projects/crew/" +
                            role.projectsVacantRoles_id +
                            "/apply"
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
        })}
      </Page>
    );
  } else if (!(projectCrewRoles && projectCrewRoles.length > 0) && loading) {
    return (
      <Page title="Crew Vacancies">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </Page>
    );
  } else {
    return (
      <Page title="Crew Vacancies">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>No Vacancies</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              There are no vacancies at the moment. Please check back later.
            </p>
          </IonCardContent>
        </IonCard>
      </Page>
    );
  }
};

export default CrewRecruitment;
