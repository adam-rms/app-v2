import { useState, useEffect } from "react";
import { Button, Container, ScrollView } from "native-base";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RMSDrawerParamList } from "../../utilities/Routing";
import useProjectData from "../../contexts/useProjectData";
import useRMSLocation from "../../contexts/useRMSLocation";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import SkeletonCard from "../../components/SkeletonCard";
import ProjectOverview from "../../components/projects/ProjectOverview";
import ProjectComments from "../../components/projects/ProjectComments";
import ProjectCrew from "../../components/projects/ProjectCrew";
import { RefreshControl } from "react-native";

//props interface for any component using project data
export interface ProjectDataProps {
  projectData: IProjectData;
}
export interface ProjectCommentsProps {
  projectComments: IComment[];
}
export interface ProjectCrewRoleProps {
  projectCrewRoles: IProjectCrewRole[];
}

/**
 * Project page
 * Lists project details
 */
const Project = ({
  route,
  navigation,
}: DrawerScreenProps<RMSDrawerParamList, "Project">) => {
  if (!route.params) {
    navigation.navigate("ProjectList");
    return;
  }

  const { projectId } = route.params;
  const { projectData, projectComments, projectCrewRoles, refreshProjectData } =
    useProjectData();
  const { getRMSLocation } = useRMSLocation();
  const [loading, setLoading] = useState<boolean>(true);

  //get individual project data
  useEffect(() => {
    setLoading(true);
    refreshProjectData(projectId);
    setLoading(false);
  }, [projectId]);

  if (projectData && projectData.project) {
    //Check project name
    let project_name = "AdamRMS Project";
    if (projectData.project && projectData.project.projects_name) {
      project_name = projectData.project.projects_name;
    }
    navigation.setOptions({ title: project_name });

    /*const buttons = [
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
    ];*/

    return (
      <Container>
        <ScrollView
          h="100%"
          refreshControl={
            <RefreshControl
              onRefresh={refreshProjectData(projectId)}
              refreshing={loading}
            />
          }
        >
          <ProjectOverview projectData={projectData} />
          {/*<ProjectComments projectComments={projectComments} />*/}
          {/*<ProjectAssetSummary projectData={projectData} />*/}
          <ProjectCrew projectData={projectData} />
          {/*<ProjectCrewRoles projectCrewRoles={projectCrewRoles} />*/}
        </ScrollView>
      </Container>
    );
  } else if (!(projectData && projectData.project) && loading) {
    return (
      <Container>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </Container>
    );
  } else {
    return (
      <Container>
        <Button onPress={() => navigation.navigate("ProjectList")}>
          Back to Projects
        </Button>
      </Container>
    );
  }
};

export default Project;
