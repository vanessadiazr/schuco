export interface Country {
  name: {
    official: string;
  };
  capital?: string[];
  population: number;
  area: number;
  currencies?: {
    code: string;
    name: string;
    symbol?: string;
  }[];
}
