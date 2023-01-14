import { faBan, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IonCard, IonCardContent, IonCardTitle, IonLabel } from "@ionic/react";

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
          <IonCard key={block.maintenanceJobs_id}>
            <IonCardContent>
              <IonCardTitle>
                <FontAwesomeIcon icon={faBan} color="#dc3545" />{" "}
                {block.maintenanceJobs_title}
              </IonCardTitle>
              <IonLabel className="container">
                {block.maintenanceJobs_faultDescription}
              </IonLabel>
            </IonCardContent>
          </IonCard>
        );
      })}
      {asset.flagsblocks.FLAG.map((block: any) => {
        return (
          <IonCard key={block.maintenanceJobs_id}>
            <IonCardContent>
              <IonCardTitle>
                <FontAwesomeIcon icon={faFlag} color="#ffc107" />{" "}
                {block.maintenanceJobs_title}
              </IonCardTitle>
              <IonLabel className="container">
                {block.maintenanceJobs_faultDescription}
              </IonLabel>
            </IonCardContent>
          </IonCard>
        );
      })}
    </>
  );
};

export default AssetMaintenance;
