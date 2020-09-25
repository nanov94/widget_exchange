import axios from 'axios';
import { currencyExchangeRapidapiHostEndpoint } from '../constants';
import { applicationKey } from '../configuration/configuration';

export async function getExchangeCurrency(value: number, from: string, to: string): Promise<number> {
    const url = `'https://${currencyExchangeRapidapiHostEndpoint}/exchange?q=${value}&from=${from}&to=${to}`;
    const headers = {
        headers: {
            'x-rapidapi-host': currencyExchangeRapidapiHostEndpoint,
            'x-rapidapi-key': applicationKey,
        }
    };

    const res = await axios.get(url, headers);

    return res.data;
}

