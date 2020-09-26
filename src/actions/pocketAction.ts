import { CHANGE_ACTIVE_WALLET, EXCHANGE } from "./actionTypes";

export const changeActiveWallet = (walletID: number) => ({
  type: CHANGE_ACTIVE_WALLET,
  payload: { walletID },
});

export const exchange = (fromWalletNumber: number, toWalletNumber: number, fromWalletAmount: number, toWalletAmount: number) => ({
  type: EXCHANGE,
  payload: { fromWalletNumber, toWalletNumber, fromWalletAmount, toWalletAmount },
});