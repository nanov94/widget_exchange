import { Currencies } from "../models/Currency";

export function getConvertationCurrencyReate(
  walletData: Currencies,
  wallets: string[],
  firstWalletNumber: number,
  secondWalletNumber: number,
  rate: number
  ): string {

  const firstCurrencySymbol = walletData[wallets[firstWalletNumber]].symbol;
  const secondCurrencySymbol = walletData[wallets[secondWalletNumber]].symbol;

  return `1${firstCurrencySymbol} = ${rate}${secondCurrencySymbol}`;;
}