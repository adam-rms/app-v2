import { Dialog } from "@capacitor/dialog";
import { actionSheetController } from "@ionic/core";
import { useIonToast } from "@ionic/react";
import { createContext, useState } from "react";
import Api from "../../utilities/Api";
import DoScan from "../../utilities/barcode/Scanner";

// The actual context
export const LocationContext = createContext<any>(null);

/**
 * Scan or Enter a location barcode
 * @returns {ILocation} The location requested
 */
const queryLocation = async () => {
  const [present] = useIonToast();

  let thisLocation: ILocation = {
    name: "",
    value: "",
    type: "custom",
  };

  //create action sheet
  const actionsheet = await actionSheetController.create({
    header: "Set Location",
    buttons: [
      {
        text: "Scan",
        data: "scan",
        icon: "search",
      },
      {
        text: "Enter Manually",
        data: "text",
        icon: "list",
      },
      {
        text: "Cancel",
        role: "cancel",
        icon: "close",
      },
    ],
  });
  await actionsheet.present();

  //get result of action sheet
  const { data } = await actionsheet.onDidDismiss();
  switch (data) {
    case "scan":
      //they want to scan a barcode, show scan interface
      const [locationBarcode, barcodeType] = await DoScan();
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
          value: result.asset["tag"] + " " + result.asset["assetTypes_name"],
          type: "asset",
        };
      } else {
        //not found
        present("Sorry, Location not found", 2000);
        return false;
      }
      break;
    case "text":
      //they want a custom location
      const { value, cancelled } = await Dialog.prompt({
        title: "Set Location",
        message: "Description of your location",
      });
      if (cancelled) {
        //there's no value
        return false;
      } else {
        thisLocation = {
          name: value,
          value: value,
          type: "custom",
        };
      }
      break;
    default:
      return false;
  }
  //return the location object
  return thisLocation;
};

//Create a provider wrapper to make the interaction with the context easier
const LocationProvider: React.FC<React.ReactNode> = ({ children }) => {
  //Create default state
  const [location, setLocation] = useState<ILocation>();

  /**
   * Refresh Context
   * Replace all projects in context
   */
  async function getLocation() {
    const location = await queryLocation();
    if (location) {
      setLocation(location);
    } else {
      //we don't have a location
      setLocation(undefined);
    }
  }

  // Don't forget to add new functions to the value of the provider!
  return (
    <LocationContext.Provider value={{ location, getLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
