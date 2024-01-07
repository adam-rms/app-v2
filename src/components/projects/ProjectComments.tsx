import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { DateTime } from "luxon";
import { ProjectCommentsProps } from "@page/projects/Project";
import Card from "../Card";
import {
  Box,
  Divider,
  HStack,
  Heading,
  Link,
  Text,
  VStack,
  View,
} from "native-base";
import { faClock, faComment } from "@fortawesome/free-solid-svg-icons";
import { useWindowDimensions } from "react-native";
import { RenderHTMLSource } from "react-native-render-html";

const ProjectComments = ({ projectComments }: ProjectCommentsProps) => {
  const { width } = useWindowDimensions();
  //add a comment card
  if (projectComments && projectComments.length > 0) {
    const commentsList: JSX.Element[] = [];
    let currentDate: string;
    projectComments.forEach((comment: IComment) => {
      //check if this date is same as previous
      const commentDate = DateTime.fromSQL(
        comment.auditLog_timestamp,
      ).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
      if (commentDate != currentDate) {
        //add a date label
        commentsList.push(
          <View
            width={40}
            borderRadius={4}
            color="#fff"
            backgroundColor="#dc3545"
            fontWeight={600}
            py={2}
            mt={2}
            key={comment.auditLog_id + "-date"}
          >
            <Text mx="auto" color="white" fontWeight="bold">
              {commentDate}
            </Text>
          </View>,
        );
        currentDate = commentDate;
      }
      commentsList.push(
        <HStack key={comment.auditLog_id} my={2} mx={2}>
          <Box
            p="2"
            borderColor="#007bff"
            borderStyle="solid"
            borderWidth={1}
            borderRadius="full"
            height={9}
            bgColor="#007bff"
          >
            <FontAwesomeIcon icon={faComment} color="white" />
          </Box>
          <VStack
            w={width - 100}
            ml={2}
            borderStyle="solid"
            borderWidth={1}
            borderColor="gray.300"
            borderRadius={4}
            p={2}
          >
            <HStack mb={2}>
              <HStack>
                <Link
                  href={"mailto:" + comment.users_email}
                  _text={{
                    color: "blue.600",
                  }}
                >
                  {comment.users_name1 + " " + comment.users_name2 + " "}
                </Link>
                <Text>Commented</Text>
              </HStack>
              <HStack ml="auto">
                <Box my="auto" mr={1}>
                  <FontAwesomeIcon icon={faClock} color="gray" />
                </Box>
                <Text color="gray.600">
                  {DateTime.fromSQL(comment.auditLog_timestamp).toLocaleString(
                    DateTime.TIME_WITH_SECONDS,
                  )}
                </Text>
              </HStack>
            </HStack>
            <Divider />
            <RenderHTMLSource
              source={{ html: comment.auditLog_actionData }}
              contentWidth={width}
            />
          </VStack>
        </HStack>,
      );
    });

    return (
      <Card p="2">
        <Heading mx="auto" mb="2">
          Project Comments
        </Heading>
        <Divider />
        <Box>{commentsList}</Box>
      </Card>
    );
  } else {
    return null;
  }
};

export default ProjectComments;
