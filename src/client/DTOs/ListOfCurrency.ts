export interface ListOfCurrencyDTO {
  [key: string]: CurrencyDTO;
}

export interface CurrencyDTO {
  currencyName: string;
  currencySymbol: string;
  id: string;
}