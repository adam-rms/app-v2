import { useState, useRef, useEffect } from "react";
import { QuaggaJSResultObject } from "@ericblade/quagga2";
import Page from "../../components/Page";
import WebScanner from "../../utilities/barcode/WebScanner";

export const WebScan = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(Array<QuaggaJSResultObject>());
  const scannerRef = useRef(null);

  useEffect(() => {
    console.log(results);
    setScanning(false);
  }, [results]);

  return (
    <Page title="Web Scan">
      <div>
        <button onClick={() => setScanning(!scanning)}>
          {" "}
          {scanning ? "Stop" : "Start"}{" "}
        </button>
        <div
          ref={scannerRef}
          style={{ position: "relative", border: "3px solid red" }}
        >
          <canvas
            className="drawingBuffer"
            style={{
              position: "absolute",
              top: "0px",
              border: "3px solid green",
            }}
            width="640"
            height="480"
          />
          {scanning ? (
            <WebScanner
              scannerRef={scannerRef}
              onDetected={(result) => setResults([...results, result])}
            />
          ) : null}
        </div>
      </div>
    </Page>
  );
};
