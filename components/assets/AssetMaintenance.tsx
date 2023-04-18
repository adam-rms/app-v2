import { faBan, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Card from "../Card";
import { Heading, Text } from "native-base";

interface AssetMaintenanceProps {
  asset: IAsset;
}

/**
 * Asset Flags and Blocks
 */
const AssetMaintenance: React.FC<AssetMaintenanceProps> = ({ asset }) => {
  return (
    <>
      {asset.flagsblocks.BLOCK.map((block: any) => {
        return (
          <Card key={block.maintenanceJobs_id}>
            <Heading>
              <FontAwesomeIcon icon={faBan} color="#dc3545" />{" "}
              {block.maintenanceJobs_title}
            </Heading>
            <Text>{block.maintenanceJobs_faultDescription}</Text>
          </Card>
        );
      })}
      {asset.flagsblocks.FLAG.map((block: any) => {
        return (
          <Card key={block.maintenanceJobs_id}>
            <Heading>
              <FontAwesomeIcon icon={faFlag} color="#ffc107" />{" "}
              {block.maintenanceJobs_title}
            </Heading>
            <Text>{block.maintenanceJobs_faultDescription}</Text>
          </Card>
        );
      })}
    </>
  );
};

export default AssetMaintenance;
