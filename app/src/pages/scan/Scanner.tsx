import { useState, useRef, useEffect } from "react";
import Page from "../../components/Page";
import WebScanner from "../../utilities/barcode/WebScanner";
import { isPlatform } from "@ionic/core";
import MobileScanner from "../../utilities/barcode/MobileScanner";

/**
 * Scan for a barcode
 * @param nextAction Function to handle the barcode, should include redirect
 * @returns {JSX.Element | Function} Page or MobileScanner
 */
export const Scanner = (
  nextAction: (barcode: string, format: string) => void,
) => {
  const [barcode, setBarcode] = useState("");
  const [format, setFormat] = useState("CODE_128");

  useEffect(() => {
    if (barcode) {
      nextAction(barcode, format);
    }
  }, [barcode]);

  //Capacitor plugin only works on mobile platforms
  if (isPlatform("ios") || isPlatform("android")) {
    MobileScanner().then((code) => {
      if (code) {
        setBarcode(code);
      }
    });
  } else {
    const scannerRef = useRef(null);
    return (
      <Page title="Barcode Scan">
        <div
          ref={scannerRef}
          style={{ position: "relative", border: "3px solid red" }}
        >
          <canvas
            className="drawingBuffer"
            style={{
              position: "absolute",
              top: "0px",
            }}
            width="640"
            height="480"
          />
          <WebScanner
            scannerRef={scannerRef}
            onDetected={(code, format) => {
              setBarcode(code);
              setFormat(format);
            }}
          />
        </div>
      </Page>
    );
  }
};
