import Api from "../Api";
import GetAssetFromBarcode from "./GetAssetFromBarcode";

/**
 * Add scanned asset to project
 * @param barcodeType type of barcode that has been scanned
 * @param barcodeData data from barcode
 * @param project_id id of project to add asset to
 * @param location for asset fetch
 * @returns {boolean | string | IAsset} IAsset if asset assigned, false if asset not found, or assignment error message
 */
const HandleAddAssetToProject = async (
  barcodeType: IPermittedBarcode,
  barcodeData: string,
  additionalData: { project_id: string; location: ILocation },
): Promise<string | boolean> => {
  if (additionalData.location.value !== undefined) {
    const asset = await GetAssetFromBarcode(
      barcodeType,
      barcodeData,
      additionalData.location,
    );

    if (asset) {
      const assignment = await Api("projects/assets/assign.php", {
        projects_id: additionalData.project_id,
        assets_id: asset.assets_id,
      });
      if (assignment.result) {
        return true;
      } else {
        return assignment.error.message;
      }
    }
  }
  return false;
};

export default HandleAddAssetToProject;
