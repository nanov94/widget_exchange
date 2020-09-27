
export const currencyExchangeRapidapiHostEndpoint = 'currency-exchange.p.rapidapi.com';

export const currencies = {
  EUR: { code: 'EUR', name: 'Euro', symbol: '€' },
  RUB: { code: 'RUB', name: 'Russian ruble', symbol: '₽' },
  USD: { code: 'USD', name: 'United States Dollar', symbol: '$' },
}

export const TextButtons = {
  cancel: 'Cancel',
  exchange: 'Exchange',
}

export const messages = {
  historyIsEmpty: 'History is empty',
}

export enum CurrencyCodes {
  EUR = 'EUR',
  RUB = 'RUB',
  USD = 'USD'
}

export enum NavigationButtons {
  account = 'Accounts',
  card = 'Card',
  send = 'Send',
  support = 'Support',
  profile = 'Profile',
}

export enum ActionButtons {
  exchange = 'Exchange',
  topup = 'TopUp',
  bank = 'Bank',
}

export enum Operations {
  EXCHANGE,
  TOP_UP,
  BANK,
}

export function getOperationMessage(type: Operations, data: string) {
  switch(type) {
    case Operations.EXCHANGE:
      return `Exchange to ${data}`;
    default:
      return;
  }
}