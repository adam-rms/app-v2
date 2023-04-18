import {
  Box,
  Divider,
  FlatList,
  HStack,
  Heading,
  Pressable,
  Text,
} from "native-base";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RMSDrawerParamList } from "../../utilities/Routing";
import Card from "../Card";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface AssetTypeAssetsProps {
  assetType: IAssetTypeData;
}

/**
 * All the assets of a particular AssetType
 */
const AssetTypeAssets: React.FC<AssetTypeAssetsProps> = ({ assetType }) => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  return (
    <Card p="2">
      <Heading mx="auto" mb="1">
        Individual Assets
      </Heading>
      <Divider />
      <FlatList
        data={assetType.tags}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("Asset", {
                typeid: assetType.assetTypes_id,
                assetid: item.assets_id,
              })
            }
            p="2"
            borderBottomColor="gray.300"
            borderBottomStyle="solid"
            borderBottomWidth="1"
          >
            <HStack>
              <Text>{item.assets_tag}</Text>
              <Box my="auto" ml="auto">
                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
              </Box>
            </HStack>
          </Pressable>
        )}
      />
    </Card>
  );
};

export default AssetTypeAssets;
