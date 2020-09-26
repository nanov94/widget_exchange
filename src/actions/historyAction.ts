import { Operations } from "../constants";
import { UPDATE_HISTORY_POCKET } from "./actionTypes";

export const updateHistoryPocket = (
  typeOfOperation: Operations,
  fromWalletCode: string,
  toWalletCode: string,
  fromWalletAmount: number,
  toWalletAmount: number) => ({

  type: UPDATE_HISTORY_POCKET,
  payload: { typeOfOperation, fromWalletCode, toWalletCode, fromWalletAmount, toWalletAmount },
});
