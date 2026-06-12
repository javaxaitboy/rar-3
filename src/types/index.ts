export interface CountryName {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface Languages {
  [key: string]: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export interface Country {
  name: CountryName;
  cca3: string;
  cca2?: string;
  ccn3?: string;
  currencies?: {
    [key: string]: Currency;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  languages?: Languages;
  latlng: [number, number];
  borders?: string[];
  area: number;
  flag: string;
  maps: Maps;
  population: number;
  timezones?: string[];
  continents?: string[];
  flags: Flags;
  coatOfArms?: CoatOfArms;
}

export interface CountrySimple {
  name: string;
  cca3: string;
  flag: string;
  flags: Flags;
  population: number;
  region: string;
  capital?: string[];
}
