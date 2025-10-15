declare module "react-country-flag" {
  import * as React from "react";

  export interface ReactCountryFlagProps {
    countryCode: string;
    svg?: boolean;
    style?: React.CSSProperties;
    title?: string;
  }

  const ReactCountryFlag: React.FC<ReactCountryFlagProps>;

  export default ReactCountryFlag;
}
