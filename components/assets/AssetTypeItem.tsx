import { VStack, Text, Container, Heading } from "native-base";
import AssetItem from "./AssetItem";
import AssetItemInformation from "./AssetItemInformation";
import RMSAccordion from "../RMSAccordion";

interface IAssetTypeItemProps {
  assetTypeKey: string; //Key
  typedAsset: IProjectAssets;
  subHire?: boolean; //If is subhire, don't link to the asset
}

const AssetTypeItem = (props: IAssetTypeItemProps) => {
  //generate list of individual assets
  const assets = props.typedAsset.assets.map((item: IAsset) => {
    return {
      header: <Heading>{item.assets_tag}</Heading>,
      content: (
        <AssetItem
          AssetTypeId={parseInt(props.assetTypeKey)}
          assetID={item.assets_id}
          item={item}
          subHire={props.subHire}
        />
      ),
    };
  });

  return (
    <Container key={props.assetTypeKey} w="full">
      <VStack w="full">
        <Text mx="auto" bold>
          {props.typedAsset.assets.length}x{" "}
          {props.typedAsset.assets[0].assetTypes_name}
        </Text>
        <AssetItemInformation item={props.typedAsset.totals} />
        <Heading size="md" mx="auto">
          Assets
        </Heading>
        <RMSAccordion sections={assets} />
      </VStack>
    </Container>
  );
};

export default AssetTypeItem;
