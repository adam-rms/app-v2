import { Divider, Heading, Text, VStack, Box, HStack } from "native-base";
import Card from "../Card";

interface AssetInformationProps {
  assetType: IAssetTypeData;
  asset: IAsset;
}

/**
 * All the information about an asset
 */
const AssetInformation: React.FC<AssetInformationProps> = ({
  assetType,
  asset,
}) => {
  return (
    <Card p="2">
      <Heading mx="auto">Asset Information</Heading>
      <Divider />
      <Text>{asset.assets_notes}</Text>
      <VStack>
        <Box>
          <Heading size="md" mx="auto">
            Asset Type Overrides
          </Heading>
          <HStack>
            <Box mx="auto">
              <Text bold>Weight</Text>
              <Text>
                {asset.assets_mass
                  ? asset.assets_mass_format
                  : assetType.assetTypes_mass_format}
              </Text>
            </Box>
            <Box mx="auto">
              <Text bold>Value</Text>
              <Text>
                {asset.assets_value
                  ? asset.assets_value_format
                  : assetType.assetTypes_value_format}
              </Text>
            </Box>
            <Box mx="auto">
              <Text bold>Day Rate</Text>
              <Text>
                {asset.assets_dayRate
                  ? asset.assets_dayRate_format
                  : assetType.assetTypes_dayRate_format}
              </Text>
            </Box>
            <Box mx="auto">
              <Text bold>Week Rate</Text>
              <Text>
                {asset.assets_weekRate
                  ? asset.assets_weekRate_format
                  : assetType.assetTypes_weekRate_format}
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box mt="2">
          <Heading size="md" mx="auto">
            Definable Fields
          </Heading>
          <VStack>
            {assetType.fields.map((element: any, index: number) => {
              if (index === 0) return;
              const field = ("asset_definableFields_" + index) as keyof IAsset;
              if (assetType.fields[index - 1] !== "" && asset[field] !== "") {
                return (
                  <HStack key={index} mx="auto">
                    <Heading size="sm">{assetType.fields[index - 1]}:</Heading>
                    <Text ml="5">{asset[field] as string}</Text>
                  </HStack>
                );
              }
            })}
          </VStack>
        </Box>
      </VStack>
    </Card>
  );
};

export default AssetInformation;
