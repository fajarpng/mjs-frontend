import { useSymbologyScanner } from "@use-symbology-scanner/react";
import { useRef } from "react";

export const Scanner = () => {
  const ref = useRef(null);

  const handleSymbol = (symbol: string, matchedSymbologies: any) => {
    console.log("Scanner" + symbol + matchedSymbologies);
  };

  useSymbologyScanner(handleSymbol, { target: ref });

  return <div ref={ref}> </div>;
};
