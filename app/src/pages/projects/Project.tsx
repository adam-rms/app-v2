import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";
import { LocationContext } from "../../contexts/location/LocationContext";
import Page from "../../components/Page";
import Refresher from "../../components/Refresher";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import AddAssetToProject from "../../utilities/barcode/AddAssetToProject";
import { useRMSToast } from "../../hooks/useRMSToast";
import ProjectCrewRoles from "../../components/projects/ProjectCrewRoles";
import ProjectCrew from "../../components/projects/ProjectCrew";
import ProjectOverview from "../../components/projects/ProjectOverview";
import ProjectComments from "../../components/projects/ProjectComments";
import ProjectAssetSummary from "../../components/projects/ProjectAssetSummary";

/**
 * Project Page
 * Lists project details
 */
const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projectData, refreshProjectData } = useContext(ProjectDataContext);
  const { getRMSLocation } = useContext(LocationContext);
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
      <ProjectOverview />
      <ProjectComments />
      <ProjectAssetSummary />
      <ProjectCrew />
    </Page>
  );
};

export default Project;
