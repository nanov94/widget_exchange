import axios from 'axios';
import { currencyExchangeRapidapiHostEndpoint } from '../constants';
import { applicationKey } from '../configuration/configuration';
import { ListOfCurrencyDTO } from './DTOs/ListOfCurrency';

// API: https://rapidapi.com/fyhao/api/currency-exchange?endpoint=53aa60c0e4b0596140341c57
export async function getExchangeCurrency(value: number, from: string, to: string): Promise<number> {
    const url = `https://${currencyExchangeRapidapiHostEndpoint}/exchange?q=${value}&from=${from}&to=${to}`;
    const headers = {
        headers: {
            'x-rapidapi-host': currencyExchangeRapidapiHostEndpoint,
            'x-rapidapi-key': applicationKey,
        }
    };

    const res = await axios.get(url, headers);

    return res.data;
}

export async function getListOfCurrency(value: number, from: string, to: string): Promise<ListOfCurrencyDTO[]> {
  const url = `https://${currencyExchangeRapidapiHostEndpoint}/listquotes`;
  const headers = {
      headers: {
          'x-rapidapi-host': currencyExchangeRapidapiHostEndpoint,
          'x-rapidapi-key': applicationKey,
      }
  };

  const res = await axios.get(url, headers);

  return res.data;
}
