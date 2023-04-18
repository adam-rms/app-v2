import { useNavigation, NavigationProp } from "@react-navigation/native";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Box, Button, Container, Text, HStack } from "native-base";
import AssetItemInformation from "./AssetItemInformation";
import { RMSDrawerParamList } from "../../utilities/Routing";

interface IAssetItemProps {
  AssetTypeId: number;
  assetID: number;
  item: any;
  subHire?: boolean; //No link if is a subhire
}

const AssetItem = (props: IAssetItemProps) => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  return (
    <Container w="full">
      <AssetItemInformation item={props.item} />
      {!props.subHire && (
        <Button
          w="full"
          background="primary"
          onPress={() => {
            navigation.navigate("Asset", {
              typeid: props.AssetTypeId,
              assetid: props.assetID,
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
    </Container>
  );
};

export default AssetItem;
