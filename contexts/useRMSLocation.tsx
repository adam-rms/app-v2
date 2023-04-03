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
/**
 * Parameters returned from the context
 * @see useLocations
 */
interface LocationContextType {
  rmsLocation: ILocation;
  getRMSLocation: (withCheck?: boolean) => ILocation;
  updateRMSLocation: () => Promise<void>;
  setRMSLocation: (location: ILocation) => void;
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
  const navigation = useNavigation<NavigationProp<RMSDrawerParamList>>();
  const { showActionSheetWithOptions } = useActionSheet();
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
   * Scan or Enter a location barcode,
   * sets the actual location
   */
  async function updateRMSLocation() {
    let thisLocation: ILocation = rmsLocation;

    const buttons = [];
    if (Platform.OS !== "web") {
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
            throw new Error("Not Implemented");
            //they want to scan a barcode, show scan interface
            const [locationBarcode, barcodeType] = [null, null]; //await DoScan();//TODO: implement DoScan

            //look up barcode
            const result = await Api("assets/barcodes/search.php", {
              text: locationBarcode,
              type: barcodeType,
            });
            if (result.location) {
              //barcode is of a location, so save that
              thisLocation = {
                name: result.location["barcode"]["locationsBarcodes_id"],
                value: result.location["locations_name"],
                type: "barcode",
              };
            } else if (result.asset) {
              //barcode is another asset (eg. a case)
              thisLocation = {
                name: result.asset["assets_id"],
                value:
                  result.asset["tag"] + " " + result.asset["assetTypes_name"],
                type: "asset",
              };
            } else {
              //not found
              thisLocation = {
                name: "Location Not Found",
                value: "",
                type: undefined,
              };
            }
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
      rmsLocation,
      getRMSLocation,
      updateRMSLocation,
      setRMSLocation,
    }),
    [rmsLocation],
  );

  return (
    <LocationContext.Provider value={memoedValue}>
      {children}
    </LocationContext.Provider>
  );
};

/**
 * Wraps the LocationContext
 * @returns An object containing:
 * - rmsLocation: The current location
 * - getRMSLocation: A function to get the current location
 * - updateRMSLocation: A function to update the current location
 */
export default function useRMSLocation() {
  return useContext(LocationContext);
}
