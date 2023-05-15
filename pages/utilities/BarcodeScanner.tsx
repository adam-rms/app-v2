import React from "react";
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { RMSDrawerParamList } from "../../utilities/Routing";
import useRMSLocation from "../../contexts/useRMSLocation";
import HandleAddAssetToProject from "../../utilities/barcode/HandleAddAssetToProject";
import { Box, Button, Divider, HStack, Heading, Text, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useInstances from "../../contexts/useInstances";

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
  const [additionalCardData, setAdditionalCardData] = useState<any>(undefined);
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

  const scanAgain = () => {
    setScanned(false);
    setAdditionalCardData(undefined);
  }

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
          navigation.navigate(returnPage);
          return;
        case "addAssetToProject":
          const asset = await HandleAddAssetToProject(
            BarcodeTypeConverter(type),
            data,
            additionalData,
          );
            if (typeof asset === "object" && "assets_id" in asset) {
            setAdditionalCardData(
              <Box textAlign="center">
                <HStack my={2}>
                  <Heading mx="auto">{asset.assets_tag} - {asset.assetTypes_name}</Heading>
                </HStack>
                <Button mx="auto" w="full" bg="primary" onPress={() => navigation.goBack()}>Back to Project</Button>
              </Box>
            );
          }
          break;
        default:
          // We don't have a valid callback
          navigation.navigate("Home");
          return;
      }
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
      <Button
        bg="primary"
        p={4}
        w={100}
        mt={12}
        ml={5}
        mb="auto"
        zIndex={100}
        onPress={() => { 
          setScanned(true); //We need this to stop the camera being used by the app
          navigation.goBack()
        }}
      >
        <HStack>
          <Box mx="2" my="auto">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Box>
          <Text my="auto">{additionalCardData ? "Back" : "Cancel"}</Text>
        </HStack>
      </Button>
      { !hasPermission && (
        <Text mx="auto">Sorry! AdamRMS can't access your camera.</Text>
      )}
      {hasPermission && !scanned && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && (
      <>
        <Button mx="auto" mb={10} bg="primary" onPress={() => scanAgain()}>Scan Again</Button>
        <Box bg="white" pb={10}>
          <Heading mx="auto" size="lg" my={2}>Scan Result</Heading>
          <Divider />
          {additionalCardData}
        </Box>
      </>
      )}
      
    </View>
  );
};

export default BarcodeScanner;
