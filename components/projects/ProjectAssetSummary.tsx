import { Box, Button, Divider, Heading, Text, VStack } from "native-base";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProjectDataProps } from "../../pages/projects/Project";
import Card from "../Card";
import { RMSDrawerParamList } from "../../utilities/Routing";

const ProjectAssetSummary = ({ projectData }: ProjectDataProps) => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  let numAssetTypes = 0;
  if (projectData.FINANCIALS.assetsAssigned) {
    numAssetTypes += Object.keys(projectData.FINANCIALS.assetsAssigned).length;
  }
  if (projectData.FINANCIALS.assetsAssignedSUB) {
    numAssetTypes += Object.keys(
      projectData.FINANCIALS.assetsAssignedSUB,
    ).length;
  }
  if (numAssetTypes == 0) {
    return <></>;
  } else {
    return (
      <Card p="2">
        <Heading mx="auto" mb="2">
          Project Assets
        </Heading>
        <Divider />
        <VStack p="2">
          <Text>
            {numAssetTypes} Asset
            {numAssetTypes != 1 ? "s" : ""} assigned to{" "}
            {projectData.project.projects_name} (
            {projectData.FINANCIALS.formattedMass})
          </Text>
          {projectData.FINANCIALS && projectData.FINANCIALS.priceMaths && (
            <Box my="2">
              <Heading size="sm">Hire Charges</Heading>
              {projectData.FINANCIALS.priceMaths.weeks > 0 && (
                <Text>Weeks: {projectData.FINANCIALS.priceMaths.weeks}</Text>
              )}
              {projectData.FINANCIALS.priceMaths.days > 0 && (
                <Text>Days: {projectData.FINANCIALS.priceMaths.days}</Text>
              )}
              <Text my="2">{projectData.FINANCIALS.priceMaths.string}</Text>
            </Box>
          )}
        </VStack>
        {numAssetTypes > 0 && (
          <Button
            bg="primary"
            _text={{ fontWeight: "bold" }}
            onPress={() =>
              navigation.navigate("ProjectAssets", {
                projectId: projectData.project.projects_id,
              })
            }
            w="full"
          >
            View Project Assets
          </Button>
        )}
      </Card>
    );
  }
};

export default ProjectAssetSummary;
