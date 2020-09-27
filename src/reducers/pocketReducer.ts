import { EXCHANGE, CHANGE_ACTIVE_WALLET, UPDATE_HISTORY_POCKET, ADD_WALLET } from '../actions/actionTypes';
import { currencies, CurrencyCodes, Operations } from "../constants";
import { Currencies } from "../models/Currency";
import { DataSetOperationHistory, ExchangeOperationHistory, OperationHistory } from '../models/OperationHistory';

const userPocket: Currencies = {
  EUR: { amount: 500, ...currencies.EUR },
  RUB: { amount: 100, ...currencies.RUB },
  USD: { amount: 200, ...currencies.USD },
};

const userPocketArray = [ CurrencyCodes.EUR, CurrencyCodes.RUB, CurrencyCodes.USD ];

const defaultState = {
  activeWalletNumber: 0,
  walletData: userPocket,
  wallets: userPocketArray,
  history: [],
}

const pocketReducer = (state = { ...defaultState }, action: any) => {
  switch(action.type) {
    case EXCHANGE:
      return exchange(state, action);
    case CHANGE_ACTIVE_WALLET:
      return {
        ...state,
        activeWalletNumber: action.payload.walletID,
      }
    case UPDATE_HISTORY_POCKET:
      return updateHistoryPocket(state, action);
    case ADD_WALLET:
      return addNewWallet(state, action);
    default:
      return state;
  }
}

function exchange(state: any, action: any) {
  const { walletData, wallets } = state;
  const updatedWallets = { ...walletData };

  updatedWallets[wallets[action.payload.fromWalletNumber]].amount -= action.payload.fromWalletAmount;
  updatedWallets[wallets[action.payload.toWalletNumber]].amount += action.payload.toWalletAmount;

  return {
    ...state,
    walletData: updatedWallets,
  }
}

function updateHistoryPocket(state: any, action: any) {
  const { typeOfOperation, fromWalletCode, toWalletCode, fromWalletAmount, toWalletAmount } = action.payload;

  let dataset: DataSetOperationHistory = {};

  switch(typeOfOperation) {
    case Operations.EXCHANGE:
      const exchangeDataSet: ExchangeOperationHistory = {
        fromWalletCode: fromWalletCode,
        toWalletCode: toWalletCode,
        fromWalletAmount: fromWalletAmount,
        toWalletAmount: toWalletAmount,
      }

      dataset = exchangeDataSet;
      break;
    default:
      break;
  }

  const operationHistory: OperationHistory = {
    date: new Date(),
    typeOfOperation,
    dataset,
  }

  const updatedHistory = [...state.history];
  updatedHistory.push(operationHistory);

  return {
    ...state,
    history: updatedHistory,
  }
}

function addNewWallet(state: any, action: any) {
  const { code, name, symbol } = action.payload;

  const newWalletData = {...state.walletData};
  const newWallets = [...state.wallets];

  newWalletData[code] = { amount: 0, code, name, symbol };
  newWallets.push(code);

  return {
    ...state,
    walletData: newWalletData,
    wallets: newWallets,
  }
}

export default pocketReducer;