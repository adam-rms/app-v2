import { IonCard, IonItem, IonList, IonTitle } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../../contexts/project/ProjectContext";
import Page from "../../components/Page";
import NavList, { NavListItemType } from "../../components/NavList";
import Refresher from "../../components/Refresher";

/**
 * Project List Page
 * Lists all projects for a business
 */
const ProjectList = () => {
  const { projects, refreshProjects } = useContext(ProjectContext);
  const [isLoading, setIsLoading] = useState(false);

  const doRefresh = async (event?: CustomEvent) => {
    setIsLoading(true);
    await refreshProjects();
    setIsLoading(false);
    if (event) event.detail.complete();
  };

  //Get data from API
  useEffect(() => {
    doRefresh();
  }, []);

  //generate project list if there are projects
  let projectList;
  if (!projects && !isLoading) {
    projectList = (
      <IonItem>
        <IonTitle>No Projects Found</IonTitle>
      </IonItem>
    );
  } else {
    const listItems = projects.map((project: IProject): NavListItemType => {
      return {
        link: `/projects/${project.projects_id}/`,
        icon: project.thisProjectManager ? "star" : ["far", "circle"],
        content: (
          <>
            <h2>{project.projects_name}</h2>
            <p>{project.clients_name}</p>
          </>
        ),
      };
    });
    projectList = (
      <NavList items={listItems} isLoading={!projects && isLoading} />
    );
  }

  return (
    <Page title="Project List">
      <Refresher onRefresh={doRefresh} />
      <IonCard>
        <IonList>{projectList}</IonList>
      </IonCard>
    </Page>
  );
};

export default ProjectList;
