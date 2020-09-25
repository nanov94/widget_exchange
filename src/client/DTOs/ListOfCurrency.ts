export interface ListOfCurrencyDTO {
  currencies: CurrencyDTO[];
}

export interface CurrencyDTO {
  code: string;
  name: string;
  symbol: string;
}