import {
  Heading,
  Divider,
  Text,
  Box,
  VStack,
  HStack,
  View,
  Container,
} from "native-base";
import { ProjectDataProps } from "../../pages/projects/Project";
import Card from "../Card";

const ProjectOverview = ({ projectData }: ProjectDataProps) => {
  return (
    <Container alignItems="center">
      <Card p="2">
        <Heading alignSelf="center" mb="2">
          Project Details
        </Heading>
        <Divider />
        <HStack>
          <VStack w="50%">
            <Box m="2">
              <View>
                <Heading size="xs">Project Manager</Heading>
                {projectData.project.projects_manager ? (
                  <Text>
                    {projectData.project.users_name1}{" "}
                    {projectData.project.users_name2}
                  </Text>
                ) : (
                  <Text>Unknown</Text>
                )}
              </View>
            </Box>
            {projectData.project.projectsTypes_config_client && (
              <Box m="2">
                <View>
                  <Heading size="xs">Client</Heading>
                  {projectData.project.clients_id ? (
                    <Text>{projectData.project.clients_name}</Text>
                  ) : (
                    <Text>Unknown</Text>
                  )}
                </View>
              </Box>
            )}
            {projectData.project.projectsTypes_config_venue && (
              <Box m="2">
                <View>
                  <Heading size="xs">Venue</Heading>
                  {projectData.project.locations_name ? (
                    <Text>{projectData.project.locations_name}</Text>
                  ) : (
                    <Text>Unknown</Text>
                  )}
                </View>
              </Box>
            )}
          </VStack>
          <VStack w="50%">
            <Box m="2">
              <View>
                <Heading size="xs">Project ID</Heading>
                <Text>{projectData.project.projects_id}</Text>
              </View>
            </Box>
            <Box m="2">
              <View>
                <Heading size="xs">Event Dates</Heading>
                {projectData.project.projects_dates_use_start ? (
                  <Text>
                    {projectData.project.projects_dates_use_start} -{" "}
                    {projectData.project.projects_dates_use_end}
                  </Text>
                ) : (
                  <Text>Unknown</Text>
                )}
              </View>
            </Box>
            <Box m="2">
              <View>
                <Heading size="xs">Dates assets in use</Heading>
                {projectData.project.projects_dates_deliver_start ? (
                  <Text>
                    {projectData.project.projects_dates_deliver_start} -{" "}
                    {projectData.project.projects_dates_deliver_end}
                  </Text>
                ) : (
                  <Text>Unknown</Text>
                )}
              </View>
            </Box>
          </VStack>
        </HStack>
      </Card>
      {projectData.project.projects_description && (
        <Card p="2">
          <Heading>Project Description</Heading>
          <Divider />
          <Text>{projectData.project.projects_description}</Text>
        </Card>
      )}
    </Container>
  );
};

export default ProjectOverview;
