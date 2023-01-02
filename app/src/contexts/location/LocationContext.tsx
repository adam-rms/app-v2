import { createContext, useEffect, useState } from "react";
import { actionSheetController } from "@ionic/core";
import { Dialog } from "@capacitor/dialog";
import { isPlatform } from "@ionic/core";
import Api from "../../utilities/Api";
import DoScan from "../../utilities/barcode/Scanner";

const getInitialState = () => {
  const location = localStorage.getItem("rmsLocation");
  if (location) {
    return JSON.parse(location);
  } else {
    return {
      name: "No Location Set",
      value: "",
      type: undefined,
    };
  }
};

// The actual context
export const LocationContext = createContext<any>({
  name: "",
  value: "",
  type: undefined,
});

//Create a provider wrapper to make the interaction with the context easier
const LocationProvider: React.FC<React.ReactNode> = ({ children }) => {
  //Create default state
  const [rmsLocation, setRMSLocation] = useState<ILocation>(getInitialState());

  useEffect(() => {
    localStorage.setItem("rmsLocation", JSON.stringify(rmsLocation));
  }, [rmsLocation]);

  /**
   * Get the RMS Location
   * @param withCheck If true, will prompt to set a location if none is set
   * @returns The location object
   */
  const getRMSLocation = async (withCheck = false) => {
    if (withCheck && rmsLocation.type === undefined) {
      //no location set, so prompt to set one
      const { value } = await Dialog.confirm({
        title: "No Location Set",
        message: "Would you like to set a Location now?",
        okButtonTitle: "Yes",
        cancelButtonTitle: "No",
      });
      if (value) {
        await updateRMSLocation();
      }
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
    if (isPlatform("ios") || isPlatform("android")) {
      //allow scanning
      buttons.push({
        text: "Scan",
        data: "scan",
      });
    }
    //add manual entry and clear buttons in all cases
    buttons.push(
      {
        text: "Enter Manually",
        data: "text",
      },
      {
        text: "Clear",
        data: "clear",
        role: "destructive",
      },
      {
        text: "Cancel",
        role: "cancel",
      },
    );

    //create action sheet
    const actionsheet = await actionSheetController.create({
      header: "Set Location",
      buttons: buttons,
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
          thisLocation = {
            name: "Location Not Found",
            value: "",
            type: undefined,
          };
        }
        break;
      case "text":
        //they want a custom location
        const { value, cancelled } = await Dialog.prompt({
          title: "Set Location",
          message: "Description of your location",
        });
        if (!cancelled) {
          thisLocation = {
            name: value,
            value: value,
            type: "custom",
          };
        }
        break;
      case "clear":
        thisLocation = {
          name: "No Location Set",
          value: "",
          type: undefined,
        };
        break;
      default:
        break;
    }
    //actually set the location
    setRMSLocation(thisLocation);
  }

  // Don't forget to add new functions to the value of the provider!
  // rmsLocation - the current location
  // getRMSLocation - prompt for location if none set, then return the location
  // updateRMSLocation - prompt for location and set it
  return (
    <LocationContext.Provider
      value={{ rmsLocation, getRMSLocation, updateRMSLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
