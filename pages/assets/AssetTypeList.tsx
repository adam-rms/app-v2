import { useEffect, useState } from "react";
import ImageList, { ImageListItemType } from "../../components/ImageList";
import useAssetTypes from "../../contexts/useAssetTypes";
import { Box, Container, Heading, Text, VStack } from "native-base";
import Card from "../../components/Card";

/**
 * Asset Type List Page
 * Lists all asset types for a business
 */
const AssetTypeList = () => {
  const { AssetTypes, refreshAssetTypes, getMoreAssets } = useAssetTypes();
  const [isLoading, setIsLoading] = useState(false);

  const doRefresh = async () => {
    setIsLoading(true);
    await refreshAssetTypes();
    setIsLoading(false);
  };

  function loadData(event: any) {
    getMoreAssets().then(() => {
      event.target.complete();
    });
  }

  const generateListItems = (assetTypes: IAssetType): ImageListItemType[] => {
    if (assetTypes && assetTypes.assets) {
      return assetTypes.assets.map((assetType: IAssetTypeData) => {
        let image;
        if (assetType.thumbnails.length > 0) {
          image = {
            url: assetType.thumbnails[0].url,
            alt: assetType.assetTypes_name,
          };
        }
        return {
          image: image,
          mainContent: (
            <VStack>
              <Heading>{assetType.assetTypes_name}</Heading>
              <Text>{assetType.assetCategories_name}</Text>
            </VStack>
          ),
          endContent: <Text>x{assetType.tags.length}</Text>,
          link: "/assets/" + assetType.assetTypes_id,
        };
      });
    } else {
      return [];
    }
  };

  //Get data from API
  useEffect(() => {
    doRefresh();
  }, []);

  return (
    <Container>
      <Card>
        <ImageList
          items={generateListItems(AssetTypes)}
          isLoading={!AssetTypes && isLoading}
          onRefresh={doRefresh}
          onInfiniteScroll={loadData}
          loadingCount={7}
          ListEmptyComponent={
            <Heading mx="auto" mt="5">
              No Assets found
            </Heading>
          }
          ListFooterComponent={
            <Box
              mt="auto"
              mb="0"
              borderTopColor="gray.300"
              borderTopStyle="solid"
              borderTopWidth="1"
            >
              <Text mx="auto" my="2" italic>
                Scroll to load more assets
              </Text>
            </Box>
          }
        />
      </Card>
    </Container>
  );
};

export default AssetTypeList;
