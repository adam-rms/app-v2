import { faBan, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Card from "../Card";
import { Box, HStack, Heading, Text } from "native-base";

interface AssetMaintenanceProps {
  asset: IAsset;
}

/**
 * Asset Flags and Blocks
 */
const AssetMaintenance: React.FC<AssetMaintenanceProps> = ({ asset }) => {
  console.log(asset.flagsblocks);
  return (
    <>
      {asset.flagsblocks.BLOCK.map((block: any) => {
        return (
          <Card key={block.maintenanceJobs_id} p="2">
            <HStack>
              <Box my="auto" mr={2}>
                <FontAwesomeIcon icon={faBan} color="#dc3545" />
              </Box>
              <Heading>{block.maintenanceJobs_title}</Heading>
            </HStack>
            <Text>{block.maintenanceJobs_faultDescription}</Text>
          </Card>
        );
      })}
      {asset.flagsblocks.FLAG.map((flag: any) => {
        return (
          <Card key={flag.maintenanceJobs_id} p="2">
            <HStack>
              <Box my="auto" mr={2}>
                <FontAwesomeIcon icon={faFlag} color="#ffc107" />
              </Box>
              <Heading>{flag.maintenanceJobs_title}</Heading>
            </HStack>
            <Text>{flag.maintenanceJobs_faultDescription}</Text>
          </Card>
        );
      })}
    </>
  );
};

export default AssetMaintenance;
