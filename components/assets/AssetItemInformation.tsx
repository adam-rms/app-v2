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
    <Box>
      <VStack>
        <HStack size="6">
          <Text>Status</Text>
          <Text>
            {props.item.status}
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
        <HStack size="6">
          <Text bold>Mass</Text>
          <Text>{props.item.formattedMass}</Text>
        </HStack>
        <HStack size="6">
          <Text bold>Price</Text>
          <Text>{props.item.formattedPrice}</Text>
        </HStack>
        <HStack size="6">
          <Text bold>Discount Price</Text>
          <Text>{props.item.formattedDiscountPrice}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};
export default AssetItemInformation;
