import Api from "../Api";

/**
 * Get an asset from a given barcode
 * @param barcodeType type of barcode to scan
 * @param barcodeData data from barcode
 * @param location to search for asset
 * @returns {IAsset | false} an Asset or false if asset can't be found
 */
const GetAssetFromBarcode = async (
  barcodeType: IPermittedBarcode,
  barcodeData: string,
  location: ILocation,
): Promise<false | IAsset> => {
  //locations are required before scanning
  if (location.type) {
    if (barcodeData) {
      //lets find the actual asset
      const assetResponse = await Api("assets/barcodes/search.php", {
        text: barcodeData,
        type: barcodeType,
        location: location.value,
        locationType: location.type,
      });
      if (assetResponse && assetResponse.response) {
        const asset = assetResponse.response;
        if (asset.asset) {
          //this is the asset you are looking for
          return asset.asset;
        } else if (asset.assetSuggest) {
          //we've not found the exact asset so return the closest suggestion
          return asset.assetSuggest;
        }
      }
    }
  }
  //no asset found so can't return asset
  return false;
};

export default GetAssetFromBarcode;
