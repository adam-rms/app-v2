import {
  VStack,
  Text,
  Container,
  Heading,
  Box,
  Button,
  HStack,
} from "native-base";
import AssetItemInformation from "./AssetItemInformation";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RMSDrawerParamList } from "@utility/Routing";

interface IAssetTypeItemProps {
  assetTypeKey: string; //Key
  typedAsset: IProjectAssets;
  subHire?: boolean; //If is subhire, don't link to the asset
}

const AssetTypeItem = (props: IAssetTypeItemProps) => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();

  return (
    <Container key={props.assetTypeKey} w="full">
      <VStack w="full">
        <Text mx="auto" bold>
          {props.typedAsset.assets.length}x{" "}
          {props.typedAsset.assets[0].assetTypes_name}
        </Text>
        <AssetItemInformation item={props.typedAsset.totals} />
        <Heading size="md" mx="auto">
          Individual Asset Tags
        </Heading>
        {props.typedAsset.assets.map((item: IAsset) => {
          return (
            <HStack key={item.assets_id} my={1}>
              <Text ml={props.subHire ? "auto" : 10} mr="auto" bold my="auto">
                {item.assets_tag}
              </Text>
              {!props.subHire && (
                <Button
                  mr={10}
                  background="primary"
                  onPress={() => {
                    navigation.navigate("Asset", {
                      typeid: parseInt(props.assetTypeKey),
                      assetid: item.assets_id,
                    });
                  }}
                >
                  <HStack>
                    <Text color="white" bold>
                      View Asset
                    </Text>
                    <Box my="auto">
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        color="white"
                      ></FontAwesomeIcon>
                    </Box>
                  </HStack>
                </Button>
              )}
            </HStack>
          );
        })}
      </VStack>
    </Container>
  );
};

export default AssetTypeItem;
