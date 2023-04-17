import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  FlatList,
  HStack,
  Heading,
  Text,
} from "native-base";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RMSDrawerParamList } from "../../utilities/Routing";
import SkeletonCard from "../../components/SkeletonCard";
import useProjectData from "../../contexts/useProjectData";
import Card from "../../components/Card";
import ScrollContainer from "../../components/ScrollContainer";
import { RefreshControl } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

interface crewRole {
  projects_id: number;
  projects_name: string;
  projects_roles: IProjectCrewRole[];
}

/**
 * The listing for each role available for a project
 * @param role - the role to display
 */
const CrewRecruitmentItem = (
  navigation: NavigationProp<RMSDrawerParamList>,
  role: IProjectCrewRole,
) => (
  <Container
    w="full"
    maxW="full"
    justifyContent="center"
    key={role.projectsVacantRoles_id}
  >
    <HStack w="100%">
      <Text my="auto" ml="10">
        {role.projectsVacantRoles_name}
      </Text>
      <Button
        ml="auto"
        mr="10"
        backgroundColor={"primary"}
        onPress={() =>
          navigation.navigate("CrewRecruitmentApplication", {
            applicationId: role.projectsVacantRoles_id,
          })
        }
      >
        {role.application === null ? "Apply" : "Applied"}
      </Button>
    </HStack>
  </Container>
);

const CrewRecruitment = () => {
  const { projectCrewRoles, refreshProjectCrewRoles } = useProjectData();
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  const [crewRoles, setCrewRoles] = useState<crewRole[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = async () => {
    setLoading(true);
    await refreshProjectCrewRoles();
    setLoading(false);
  };

  useEffect(() => {
    refresh();
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
      <Container>
        <ScrollContainer
          refreshControl={
            <RefreshControl onRefresh={refresh} refreshing={loading} />
          }
        >
          {crewRoles.map((project) => {
            return (
              <Card key={project.projects_id}>
                <Box px="2">
                  <HStack>
                    <Heading my="auto" ml="5">
                      {project.projects_name}
                    </Heading>
                    <Button
                      ml="auto"
                      mr="2"
                      my="2"
                      backgroundColor={"primary"}
                      onPress={() =>
                        navigation.navigate("Project", {
                          projectId: project.projects_id,
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} color="white" />
                    </Button>
                  </HStack>

                  <Divider />

                  <FlatList
                    my="2"
                    w="full"
                    data={project.projects_roles}
                    renderItem={({ item }) =>
                      CrewRecruitmentItem(navigation, item)
                    }
                    keyExtractor={(item) =>
                      item.projectsVacantRoles_id.toString()
                    }
                    scrollEnabled={false}
                  />
                </Box>
              </Card>
            );
          })}
        </ScrollContainer>
      </Container>
    );
  } else if (!(projectCrewRoles && projectCrewRoles.length > 0) && loading) {
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
        <ScrollContainer
          refreshControl={
            <RefreshControl onRefresh={refresh} refreshing={loading} />
          }
        >
          <Card>
            <Box p="2" alignItems="center">
              <Heading>No Vacancies</Heading>
              <Divider />
              <Text>There are no vacancies at the moment.</Text>
              <Text>Please check back later.</Text>
            </Box>
          </Card>
        </ScrollContainer>
      </Container>
    );
  }
};

export default CrewRecruitment;
