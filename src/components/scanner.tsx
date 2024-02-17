import { useSymbologyScanner } from "@use-symbology-scanner/react";
import { useRef } from "react";

export const App = () => {
  const ref = useRef(null);

  const handleSymbol: any<any> = (symbol, matchedSymbologies) => {
    console.log(`Scanned ${symbol}`);
  };

  useSymbologyScanner(handleSymbologies, { target: ref });

  return <div ref={ref}></div>;
};
