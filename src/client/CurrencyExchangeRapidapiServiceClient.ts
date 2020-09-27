import axios from 'axios';
import { currencyExchangeRapidapiHostEndpoint } from '../constants';
import { currencyExchangeApplicationKey, freeCurrconvApplicationKey } from '../configuration/configuration';
import { ListOfCurrencyDTO } from './DTOs/ListOfCurrency';

// Resource: https://rapidapi.com/fyhao/api/currency-exchange?endpoint=53aa60c0e4b0596140341c57
export async function getExchangeCurrency(from: string, to: string): Promise<number> {
  const url = `https://${currencyExchangeRapidapiHostEndpoint}/exchange?q=1&from=${from}&to=${to}`;
  const headers = {
    headers: {
      'x-rapidapi-host': currencyExchangeRapidapiHostEndpoint,
      'x-rapidapi-key': currencyExchangeApplicationKey,
    }
  };

  const res = await axios.get(url, headers);

  return res.data;
}

export async function getListOfCurrency(): Promise<ListOfCurrencyDTO> {
  const url = `https://free.currconv.com/api/v7/currencies?apiKey=${freeCurrconvApplicationKey}`;

  const res = await axios.get(url);

  return res.data.results;
}
