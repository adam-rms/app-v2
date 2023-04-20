import { useState, useEffect } from "react";
import { Box, Button, Container, ScrollView } from "native-base";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RefreshControl } from "react-native";
import { RMSDrawerParamList } from "../../utilities/Routing";
import useProjectData from "../../contexts/useProjectData";
import useRMSLocation from "../../contexts/useRMSLocation";
import SkeletonCard from "../../components/SkeletonCard";
import ProjectOverview from "../../components/projects/ProjectOverview";
import ProjectAssetSummary from "../../components/projects/ProjectAssetSummary";
import ProjectCrew from "../../components/projects/ProjectCrew";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ProjectCrewRoles from "../../components/projects/ProjectCrewRoles";

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
    return <></>;
  }

  const { projectId } = route.params;
  const { projectData, projectCrewRoles, refreshProjectData } =
    useProjectData();
  const { getRMSLocation } = useRMSLocation();
  const [loading, setLoading] = useState<boolean>(true);

  const doRefresh = async () => {
    setLoading(true);
    await refreshProjectData(projectId);
    setLoading(false);
  };

  //get individual project data
  useEffect(() => {
    doRefresh();
  }, [projectId]);

  if (projectData && projectData.project) {
    //Check project name
    let project_name = "AdamRMS Project";
    if (projectData.project && projectData.project.projects_name) {
      project_name = projectData.project.projects_name;
    }

    const buttons = (
      <Box>
        <Button
          onPress={() => {
            if (projectData) {
              const location = getRMSLocation(true);
              if (location.type !== undefined) {
                //we have a location, so can add assets to a project.
                navigation.navigate("BarcodeScanner", {
                  callback: "addAssetToProject",
                  returnPage: "Project",
                  additionalData: {
                    project_id: projectData.project.projects_id,
                    location: location,
                  },
                });
              }
            }
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
        </Button>
      </Box>
    );

    navigation.setOptions({ title: project_name, headerRight: () => buttons });

    return (
      <Container>
        <ScrollView
          h="100%"
          refreshControl={
            <RefreshControl
              onRefresh={() => refreshProjectData(projectId)}
              refreshing={loading}
            />
          }
        >
          <ProjectOverview projectData={projectData} />
          {/*<ProjectComments projectComments={projectComments} />*/}
          <ProjectAssetSummary projectData={projectData} />
          <ProjectCrew projectData={projectData} />
          <ProjectCrewRoles projectCrewRoles={projectCrewRoles} />
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
