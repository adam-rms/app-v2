import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { RMSDrawerParamList } from "@utility/Routing";
import useRMSLocation from "@context/useRMSLocation";
import HandleAddAssetToProject from "@utility/barcode/HandleAddAssetToProject";
import { Box, Button, HStack, Text } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useInstances from "@context/useInstances";

/** Convert the barcode type to the expected format
 * @param {string} type - The barcode type
 * @returns {IPermittedBarcode} - The converted barcode type
 * @see https://docs.expo.io/versions/latest/sdk/bar-code-scanner/#barcodetypes
 */
const BarcodeTypeConverter = (type: string): IPermittedBarcode => {
  switch (type) {
    case "org.gs1.EAN-8":
      return "EAN_8";
    case "org.gs1.EAN-13":
      return "EAN_13";
    case "org.iso.Code39":
      return "CODE_39";
    case "org.iso.Code93":
      return "CODE_93";
    case "org.iso.Code128":
      return "CODE_128";
    default:
      return undefined;
  }
};

/**
 * A Screen to handle barcode scanning and return the result to the expected callback.
 * For new usage, update the callback parameter in routing for this page and the switch below.
 * ---
 * ### Parameters
 * Parameters are passed via the navigation object
 * @param {string} callback - The callback to return the result to
 * @param {keyof RMSDrawerParamList} returnPage - The page to return to after the scan & callback
 * @param {any} additionalData - Any additional data to pass to the callback
 * @returns
 */
const BarcodeScanner = () => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  const route = useRoute<RouteProp<RMSDrawerParamList, "BarcodeScanner">>();
  const { handleLocationBarCodeScanned } = useRMSLocation();
  const { instancePermissionCheck } = useInstances();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  //Check the page has been passed params - occurs when the user navigates to the page directly
  if (
    !route.params ||
    !route.params.callback ||
    !route.params.returnPage ||
    !instancePermissionCheck("ASSETS:ASSET_BARCODES:VIEW:SCAN_IN_APP")
  ) {
    navigation.navigate("Home");
  }
  const { callback, returnPage, additionalData } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    setScanned(false);
  }, []);

  useEffect(() => {
    setScanned(false);
  }, [callback, returnPage, additionalData]);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    if (returnPage && callback && returnPage !== "BarcodeScanner") {
      // Handle Callback - expand this to handle new usage of the scanner
      switch (callback) {
        case "location":
          handleLocationBarCodeScanned(BarcodeTypeConverter(type), data);
          break;
        case "addAssetToProject":
          await HandleAddAssetToProject(
            BarcodeTypeConverter(type),
            data,
            additionalData,
          );
          break;
        default:
          // We don't have a valid callback
          navigation.goBack();
          return;
      }
      navigation.navigate(returnPage);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {hasPermission && !scanned ? (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <Text mx="auto">Sorry! AdamRMS can't access your camera.</Text>
      )}
      <Button
        bg="primary"
        p="4"
        w="full"
        onPress={() => {
          setScanned(true);
          navigation.goBack();
        }}
      >
        <HStack>
          <Box mx="2" my="auto">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Box>
          <Text my="auto">Cancel Scan</Text>
        </HStack>
      </Button>
    </View>
  );
};

export default BarcodeScanner;
