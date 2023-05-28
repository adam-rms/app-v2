import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Alert, Platform } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Api from "../utilities/Api";
import { FetchData, StoreData } from "../utilities/DataStorage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RMSDrawerParamList } from "../utilities/Routing";
import { useToast } from "native-base";
import useInstances from "./useInstances";
/**
 * Parameters returned from the context
 * @see useLocations
 */
interface LocationContextType {
  getRMSLocation: (withCheck?: boolean) => ILocation;
  updateRMSLocation: () => Promise<void>;
  setRMSLocation: (location: ILocation) => void;
  handleLocationBarCodeScanned: (type: IPermittedBarcode, data: string) => void;
}

// The actual context
export const LocationContext = createContext<LocationContextType>(
  {} as LocationContextType,
);

//Create a provider wrapper to make the interaction with the context easier
export const LocationProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const toast = useToast();
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  const { showActionSheetWithOptions } = useActionSheet();
  const { instancePermissionCheck } = useInstances();
  //Create default state
  const [rmsLocation, setRMSLocation] = useState<ILocation>({} as ILocation);

  //Effects to fetch and store Location data.
  useEffect(() => {
    const fetchLocation = async () => {
      const location = await FetchData("rmsLocation");
      if (location) {
        setRMSLocation(JSON.parse(location));
      } else {
        setRMSLocation({
          name: "No Location Set",
          value: "",
          type: undefined,
        });
      }
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    const setLocation = async () => {
      StoreData("rmsLocation", JSON.stringify(rmsLocation));
    };
    setLocation();
  }, [rmsLocation]);

  /**
   * Get the RMS Location
   * @param withCheck If true, will prompt to set a location if none is set
   * @param callback Optional callback to run after the location is set
   * @returns The location object
   */
  const getRMSLocation = (withCheck = false) => {
    if (withCheck && rmsLocation.type === undefined) {
      Alert.alert("No Location Set", "Would you like to set a Location now?", [
        {
          text: "Yes",
          onPress: () => updateRMSLocation(),
        },
        {
          text: "No",
          style: "cancel",
        },
      ]);
    }
    return rmsLocation;
  };

  /**
   * Update the RMS Location from the given barcode values
   * @param barcodeType The type of barcode
   * @param barcodeData The data of the barcode
   */
  const handleLocationBarCodeScanned = async (
    barcodeType: IPermittedBarcode,
    barcodeData: string,
  ) => {
    console.log("Scanned: " + barcodeData + " (" + barcodeType + ")");
    //look up barcode
    const result = await Api("assets/barcodes/search.php", {
      text: barcodeData,
      type: barcodeType,
    });
    if (result.result) {
      if (result.response.location) {
        //barcode is of a location, so save that
        setRMSLocation({
          name: result.response.location["locations_name"],
          value: result.response.location["barcode"]["locationsBarcodes_id"],
          type: "barcode",
        });
      } else if (result.response.asset) {
        //barcode is another asset (eg. a case)
        setRMSLocation({
          name:
            result.response.asset["tag"] +
            " " +
            result.response.asset["assetTypes_name"],
          value: result.response.asset["assets_id"],
          type: "asset",
        });
      } else {
        //not found
        setRMSLocation({
          name: "Location Not Found",
          value: "",
          type: undefined,
        });
      }
    } else {
      //error
      toast.show({
        title: "Error",
        description: result.error,
      });
    }
  };

  /**
   * Scan or Enter a location barcode,
   * sets the actual location
   */
  async function updateRMSLocation() {
    let thisLocation: ILocation = rmsLocation;

    const buttons = [];
    if (
      Platform.OS !== "web" &&
      instancePermissionCheck("ASSETS:ASSET_BARCODES:VIEW:SCAN_IN_APP")
    ) {
      //allow scanning
      buttons.push("Scan");
    }
    //add manual entry and clear buttons in all cases
    buttons.push("Enter Manually", "Clear", "Cancel");

    //create action sheet
    showActionSheetWithOptions(
      {
        options: buttons,
        cancelButtonIndex: buttons.length - 1, // may be 3 or 2 depending on platform
        destructiveButtonIndex: buttons.length - 2, // may be 2 or 1 depending on platform
        title: "Set Location",
      },
      async (buttonIndex: number | undefined) => {
        switch (buttonIndex) {
          case 0:
            //they want to scan a barcode, show scan interface
            navigation.navigate("BarcodeScanner", {
              callback: "location",
              returnPage: "Home",
            });
            break;
          case 1:
            //Entering a custom location
            navigation.navigate("SetManualLocation");
            break;
          case 2:
          //clear location
          //fall through to
          default:
            thisLocation = {
              name: "No Location Set",
              value: "",
              type: undefined,
            };
            break;
        }
      },
    );
    //actually set the location
    setRMSLocation(thisLocation);
  }

  //Memoize the context so it doesn't change on every render
  const memoedValue = useMemo(
    () => ({
      getRMSLocation,
      updateRMSLocation,
      setRMSLocation,
      handleLocationBarCodeScanned,
    }),
    [rmsLocation, instancePermissionCheck],
  );

  return (
    <LocationContext.Provider value={memoedValue}>
      {children}
    </LocationContext.Provider>
  );
};

/**
 * Wraps the LocationContext
 * @returns A Hook containing:
 * - getRMSLocation: Location Getter
 * - updateRMSLocation: Location Setter - Use this to have the full UI for setting barcodes
 * - setRMSLocation: Utility function to set the location - use the above updateRMSLocation to set the location
 * - handleLocationBarCodeScanned: Utility function to set the location - should only be called from the BarcodeScanner Page
 */
export default function useRMSLocation() {
  return useContext(LocationContext);
}
