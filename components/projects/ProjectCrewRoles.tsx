import { Button, Divider, FlatList, HStack, Heading } from "native-base";
import { ProjectCrewRoleProps } from "../../pages/projects/Project";
import Card from "../Card";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RMSDrawerParamList } from "../../utilities/Routing";

/**
 * Available Crew Roles card for Project in current context
 */
const ProjectCrewRoles = ({
  projectCrewRoles,
}: ProjectCrewRoleProps): JSX.Element => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  if (projectCrewRoles && projectCrewRoles.length > 0) {
    return (
      <Card p="2">
        <Heading mx="auto">Available Crew Roles</Heading>
        <Divider />
        <FlatList
          data={projectCrewRoles}
          keyExtractor={(item) => item.projectsVacantRoles_id.toString()}
          renderItem={({ item }) => (
            <HStack p="2">
              <Heading my="auto">{item.projectsVacantRoles_name}</Heading>
              <Button
                ml="auto"
                bg="primary"
                onPress={() =>
                  navigation.navigate("CrewRecruitmentApplication", {
                    applicationId: item.projectsVacantRoles_id,
                  })
                }
              >
                {item.application === null ? "Apply" : "Applied"}
              </Button>
            </HStack>
          )}
          scrollEnabled={false}
        />
      </Card>
    );
  } else {
    return <></>;
  }
};

export default ProjectCrewRoles;
