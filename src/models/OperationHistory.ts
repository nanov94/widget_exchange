import { Operations } from "../constants";

export type DataSetOperationHistory = ExchangeOperationHistory | any;

export interface OperationHistory {
  date: Date;
  typeOfOperation: Operations;
  dataset: DataSetOperationHistory;
};

export interface ExchangeOperationHistory {
  fromWalletCode: string;
  toWalletCode: string;
  fromWalletAmount: number;
  toWalletAmount: number;
};