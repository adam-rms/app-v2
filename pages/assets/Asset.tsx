import { useEffect, useState } from "react";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RefreshControl } from "react-native";
import { Container, Text, ScrollView } from "native-base";
import Card from "../../components/Card";
import { RMSDrawerParamList } from "../../utilities/Routing";
import useAssetTypes from "../../contexts/useAssetTypes";
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
const Asset = ({
  route,
  navigation,
}: DrawerScreenProps<RMSDrawerParamList, "Asset">) => {
  const { typeid, assetid } = route.params;
  const { thisAssetType, refreshAssetTypes } = useAssetTypes();
  const [isLoading, setIsLoading] = useState(false);

  const doRefresh = async () => {
    setIsLoading(true);
    // only get the asset type we're looking at
    await refreshAssetTypes(typeid);
    setIsLoading(false);
  };

  useEffect(() => {
    doRefresh();
  }, [typeid]);

  //if we've got the asset, show data
  if (thisAssetType) {
    let thisAsset: IAsset | undefined = undefined;
    //if we've got an individual asset, show asset data rather than asset type data
    if (assetid) {
      //filter by requested asset
      thisAsset = thisAssetType.tags.find(
        (element: IAsset) => element.assets_id == assetid,
      );
    }

    //set page title
    navigation.setOptions({
      title: thisAsset
        ? thisAsset.assets_tag_format
        : thisAssetType.assetTypes_name,
    });

    //return page layout
    return (
      <Container>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={doRefresh} />
          }
        >
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
            <FileList
              files={thisAssetType.files}
              cardTitle="Asset Type Files"
            />
          )}
          {thisAsset && thisAsset.files && thisAsset.files.length > 0 && (
            <FileList files={thisAsset.files} cardTitle="Asset Files" />
          )}
        </ScrollView>
      </Container>
    );
  } else {
    return (
      <Container>
        <Card>
          {isLoading ? <SkeletonCard /> : <Text>Asset not found</Text>}
        </Card>
      </Container>
    );
  }
};

export default Asset;
