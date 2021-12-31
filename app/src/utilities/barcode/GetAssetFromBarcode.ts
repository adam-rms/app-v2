import Api from "../Api";
import DoScan from "./Scanner";

/**
 * Open a scanning prompt and get associated asset
 * @returns {IAsset | false} an Asset or false if asset can't be found
 */
const GetAssetFromBarcode = async (location: ILocation) => {
  //locations are requred before scanning
  if (location.type) {
    const [scanResult, barcodeType] = await DoScan();

    if (scanResult) {
      //lets find the actual asset
      const asset = await Api("assets/barcodes/search.php", {
        text: scanResult,
        type: barcodeType,
        location: location.value,
        locationType: location.type,
      });

      if (asset.asset) {
        //this is the asset you are looking for
        return asset.asset;
      } else if (asset.assetSuggest) {
        //we've not found the exact asset so return the closest suggestion
        return asset.assetSuggest;
      }
    }
  } else {
    return false;
  }

  //no asset found so can't return asset
  return false;
};

export default GetAssetFromBarcode;
