import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { ProjectDataProps } from "@page/projects/Project";
import {
  Divider,
  Heading,
  Text,
  Container,
  HStack,
  Popover,
  Button,
  FlatList,
} from "native-base";
import Card from "../Card";

const ProjectCrew = ({ projectData }: ProjectDataProps) => {
  const CrewItem = (item: IProjectCrewAssignment) => {
    return (
      <Container key={item.crewAssignments_id}>
        <HStack
          minH="15"
          w="full"
          p="2"
          borderColor="coolGray.200"
          borderBottomWidth="1"
        >
          <Text mx={2} my="auto" fontWeight="bold">
            {item.crewAssignments_role}
          </Text>
          <Text my="auto">
            {item.users_name1} {item.users_name2}
          </Text>
          {item.crewAssignments_comment && (
            <Popover
              key={item.crewAssignments_id + "-comment"}
              trigger={(triggerProps) => {
                return (
                  <Button {...triggerProps}>
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </Button>
                );
              }}
            >
              <Popover.Content accessibilityLabel="Assignment Comment" w="56">
                <Popover.Arrow />
                <Popover.CloseButton />
                <Popover.Header>{item.crewAssignments_role}</Popover.Header>
                <Popover.Body>{item.crewAssignments_comment}</Popover.Body>
              </Popover.Content>
            </Popover>
          )}
        </HStack>
      </Container>
    );
  };
  if (
    projectData.project.crewAssignments &&
    projectData.project.crewAssignments.length > 0
  ) {
    return (
      <Card p="2">
        <Heading alignSelf="center" mb="2">
          Project Crew
        </Heading>
        <Divider />
        <FlatList
          w="full"
          data={projectData.project.crewAssignments}
          renderItem={({ item }) => CrewItem(item as IProjectCrewAssignment)}
          keyExtractor={(item: IProjectCrewAssignment) =>
            item.crewAssignments_id.toString()
          }
          scrollEnabled={false}
        />
      </Card>
    );
  } else {
    return null;
  }
};

export default ProjectCrew;
