import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AssetTypeContext } from "../../contexts/asset/AssetTypeContext";
import Page from "../../components/Page";
import Refresher from "../../components/Refresher";
import SkeletonCard from "../../components/SkeletonCard";
import AssetMaintenance from "../../components/assets/AssetMaintenance";
import AssetInformation from "../../components/assets/AssetInformation";
import FileList from "../../components/FileList";
import ImageSlideshow from "../../components/ImageSlideshow";
import AssetTypeInformation from "../../components/assets/AssetTypeInformation";
import AssetTypeAssets from "../../components/assets/AssetTypeAssets";

/**
 * Asset Page
 * Lists details for an asset type or individual asset, depending on parameters
 */
const Asset = () => {
  const { type, asset } = useParams<{ type: string; asset?: string }>();
  const { AssetTypes, refreshAssetTypes } = useContext(AssetTypeContext);
  const [isLoading, setIsLoading] = useState(false);

  const doRefresh = async (event?: CustomEvent) => {
    setIsLoading(true);
    // only get the asset type we're looking at
    await refreshAssetTypes(parseInt(type));
    setIsLoading(false);
    if (event) event.detail.complete();
  };

  useEffect(() => {
    doRefresh();
  }, []);

  //filter by requested asset type
  const thisAssetType = AssetTypes.assets.find(
    (element: IAssetTypeData) => element.assetTypes_id == parseInt(type),
  );

  //if we've got the asset, show data
  if (thisAssetType) {
    let thisAsset: IAsset | undefined = undefined;
    //if we've got an individual asset, show asset data rather than asset type data
    if (asset) {
      //filter by requested asset
      thisAsset = thisAssetType.tags.find(
        (element: IAsset) => element.assets_id == parseInt(asset),
      );
    }

    //return page layout
    return (
      <Page
        title={
          thisAsset
            ? thisAsset.assets_tag_format
            : thisAssetType.assetTypes_name
        }
      >
        <Refresher onRefresh={doRefresh} />
        {/* Asset Data */}
        {thisAsset && (
          <AssetInformation asset={thisAsset} assetType={thisAssetType} />
        )}

        {/* Maintenance */}
        {thisAsset && <AssetMaintenance asset={thisAsset} />}

        <ImageSlideshow images={thisAssetType.thumbnails} />

        {/* AssetType Data */}
        <AssetTypeInformation assetType={thisAssetType} />

        {/* Asset Data or link to individual assets */}
        {!thisAsset && <AssetTypeAssets assetType={thisAssetType} />}

        {/* Files */}
        {thisAssetType.files && thisAssetType.files.length > 0 && (
          <FileList files={thisAssetType.files} cardTitle="Asset Type Files" />
        )}
        {thisAsset && thisAsset.files && thisAsset.files.length > 0 && (
          <FileList files={thisAsset.files} cardTitle="Asset Files" />
        )}
      </Page>
    );
  } else {
    return <Page title="No Asset Found">{isLoading && <SkeletonCard />}</Page>;
  }
};

export default Asset;
