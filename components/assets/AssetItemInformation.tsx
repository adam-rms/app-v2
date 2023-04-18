import {
  faCheck,
  faMapMarkerAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Badge, Box, HStack, Text, VStack } from "native-base";

interface IAssetItemInformationProps {
  item: {
    status: string;
    latestScan?: {
      locations_name?: string;
      assetTypes_name?: string;
      assetsBarcodes_customLocation?: string;
    };
    formattedMass: string;
    formattedPrice: string;
    formattedDiscountPrice: string;
    [key: string]: any; //Allow any other properties
  };
}

const AssetItemInformation = (props: IAssetItemInformationProps) => {
  return (
    <Box w="full">
      <VStack>
        <HStack size="6" mx="auto">
          <Text bold>Status: </Text>
          <Text>
            {props.item.status ?? "Unknown"}
            {props.item.latestScan && "/"}

            {/*Location Scan*/}
            {props.item.latestScan && props.item.latestScan.locations_name && (
              <Badge>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </Badge>
            )}
            {props.item.latestScan && props.item.latestScan.assetTypes_name && (
              <Badge colorScheme="info">
                <FontAwesomeIcon icon={faCheck} />
              </Badge>
            )}
            {props.item.latestScan &&
              props.item.latestScan.assetsBarcodes_customLocation && (
                <Badge colorScheme="danger">
                  <FontAwesomeIcon icon={faTimes} />
                </Badge>
              )}
          </Text>
        </HStack>
        <HStack my="2">
          <VStack mx="auto">
            <Text bold>Mass</Text>
            <Text>{props.item.formattedMass}</Text>
          </VStack>
          <VStack mx="auto">
            <Text bold>Price</Text>
            <Text>{props.item.formattedPrice}</Text>
          </VStack>
          <VStack mx="auto">
            <Text bold>Discount Price</Text>
            <Text>{props.item.formattedDiscountPrice}</Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  );
};
export default AssetItemInformation;
