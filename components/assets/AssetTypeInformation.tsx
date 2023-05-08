import * as Linking from "expo-linking";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Card from "../Card";
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
} from "native-base";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface AssetTypeInformationProps {
  assetType: IAssetTypeData;
}

/**
 * Information about the asset type
 */
const AssetTypeInformation: React.FC<AssetTypeInformationProps> = ({
  assetType,
}) => {
  return (
    <Card p="2">
      <Heading mx="auto" mb="1">
        {" "}
        Asset Type Information{" "}
      </Heading>
      <Divider />
      <VStack w="full">
        <HStack w="full">
          <Box mx="auto">
            <Text bold>Manufacturer</Text>
            <Text>{assetType.manufacturers_name}</Text>
          </Box>
          <Box mx="auto">
            <Text bold>Category</Text>
            <Text>{assetType.assetCategories_name}</Text>
          </Box>
        </HStack>
        {assetType.assetTypes_productLink && (
          <Button
            bg="primary"
            my={2}
            onPress={() => Linking.openURL(assetType.assetTypes_productLink)}
          >
            <HStack>
              <Text my="auto" color="white" bold>
                Manufacturer Information
              </Text>
              <Box my="auto">
                <FontAwesomeIcon color="white" icon={faChevronRight} />
              </Box>
            </HStack>
          </Button>
        )}
        <HStack>
          <Box mx="auto">
            <Text bold>Weight</Text>
            <Text>{assetType.assetTypes_mass_format}</Text>
          </Box>
          <Box mx="auto">
            <Text bold>Value</Text>
            <Text>{assetType.assetTypes_value_format}</Text>
          </Box>
          <Box mx="auto">
            <Text bold>Day Rate</Text>
            <Text>{assetType.assetTypes_dayRate_format}</Text>
          </Box>
          <Box mx="auto">
            <Text bold>Week Rate</Text>
            <Text>{assetType.assetTypes_weekRate_format}</Text>
          </Box>
        </HStack>
      </VStack>
    </Card>
  );
};

export default AssetTypeInformation;
