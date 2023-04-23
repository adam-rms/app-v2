import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { DateTime } from "luxon";
import { ProjectCommentsProps } from "../../pages/projects/Project";
import Card from "../Card";
import { Box, Divider, Heading, Link, View } from "native-base";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

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
            borderRadius={4}
            color="#fff"
            backgroundColor="#dc3545"
            fontWeight={600}
            padding={5}
            key={comment.auditLog_id + "-date"}
          >
            <View
              borderRadius={4}
              color="#fff"
              backgroundColor="#dc3545"
              fontWeight={600}
              padding={5}
            >
              {commentDate}
            </View>
          </View>,
        );
        currentDate = commentDate;
      }
      commentsList.push(
        <View key={comment.auditLog_id}>
          <FontAwesomeIcon icon={["far", "comment"]} />
          <View
            shadow="0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%)"
            borderRadius="0.25rem"
            backgroundColor="#fff"
            color="#495057"
            marginLeft={60}
            marginRight={15}
            marginTop={0}
            padding={0}
            position="relative"
          >
            <View color="#999" ml="auto" fontSize={12} p={10}>
              <FontAwesomeIcon icon="clock" />{" "}
              {DateTime.fromSQL(comment.auditLog_timestamp).toLocaleString(
                DateTime.TIME_WITH_SECONDS,
              )}
            </View>
            <Heading
              borderBottomColor="rgba(0, 0, 0, 0.125)"
              borderBottomStyle="solid"
              borderBottomRightRadius={1}
              color="#495057"
              lineHeight={1.1}
              m={0}
              p={10}
            >
              <Link
                fontWeight={600}
                color="#3880FF"
                href={"mailto:" + comment.users_email}
              >
                {comment.users_name1 + " " + comment.users_name2}
              </Link>{" "}
              Commented
            </Heading>
            <RenderHtml
              source={{ html: comment.auditLog_actionData }}
              contentWidth={width}
            />
          </View>
        </View>,
      );
    });

    return (
      <Card>
        <Heading>Project Comments</Heading>
        <Divider />

        <Box>
          {commentsList}
          <View>
            {/* End with a clock to show "now" */}
            <FontAwesomeIcon
              icon={faClock}
              style={{ backgroundColor: "#6c757d" }}
            />
          </View>
        </Box>
      </Card>
    );
  } else {
    return null;
  }
};

export default ProjectComments;
