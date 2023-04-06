import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useState, useEffect } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { RMSDrawerParamList } from "../../utilities/Routing";
import useRMSLocation from "../../contexts/useRMSLocation";

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
 * @returns
 */
const BarcodeScanner = () => {
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  const route = useRoute<RouteProp<RMSDrawerParamList, "BarcodeScanner">>();
  const { handleLocationBarCodeScanned } = useRMSLocation();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  //Check the page has been passed params - occurs when the user navigates to the page directly
  if (!route.params || !route.params.callback || !route.params.returnPage) {
    navigation.navigate("Home");
  }
  const { callback, returnPage } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({
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
        default:
          // We don't have a valid callback
          navigation.navigate("Home");
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
      {hasPermission ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <Text>Sorry! AdamRMS can't access your camera.</Text>
      )}

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

export default BarcodeScanner;
