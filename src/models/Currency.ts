export interface Currencies {
  [key: string]: Currency;
};

export interface Currency {
  amount: number;
  code: string;
  name: string;
  symbol: string;
};