import React, { Component } from 'react';
import Buttons from '../components/Buttons/Buttons';
import { currencies, TextButtons } from '../constants';
import TextField from '@material-ui/core/TextField';
import Swipe from '../components/Swipe/Swipe';
import { getExchangeCurrency } from '../client/CurrencyExchangeRapidapiServiceClient';

const buttons = [TextButtons.cancel, TextButtons.exchange];

type Currency = {
  amount: number;
  code: string;
  name: string;
  symbol: string;
};

const testCurrencies: Currency[] = [
  { amount: 500, ...currencies.EUR },
  { amount: 100, ...currencies.GBP },
  { amount: 200, ...currencies.USD }];

export default class ExchangePage extends Component {
  state = {
    fromWalletNumber: 0,
    toWalletNumber: 0,
    wallets: testCurrencies,
    exchangedAmount: 0,
    convertedAmount: 0,
  };

  handleChangeWallet = async (fromWalletNumber: number, toWalletNumber: number, exchangedAmount: number = this.state.exchangedAmount) => {
    getExchangeCurrency(exchangedAmount, testCurrencies[fromWalletNumber].code, testCurrencies[toWalletNumber].code)
      .then((result: any) => {
        this.state.convertedAmount = exchangedAmount * result.toFixed(2);
        this.state.exchangedAmount = exchangedAmount;
        this.setState((state) => ({ fromWalletNumber, toWalletNumber }));
      })
      .catch((error: any) => console.log(`Server is not available! Error: ${error}.`));
  };

  handleChangeAmount = (event: any) => {
    this.handleChangeWallet(this.state.fromWalletNumber, this.state.toWalletNumber, event.target.value);
  }

  render() {
    return (
      <>
        <Swipe
          activeItem={ this.state.fromWalletNumber }
          changeActiveItem={(num: number) => this.handleChangeWallet(num, this.state.toWalletNumber)}
          countSteps={ this.state.wallets.length }>
          {
            this.state.wallets.map((wallet) => (
              <>
                <div> { wallet.symbol } { wallet.amount }</div>
                <div> { wallet.code } - { wallet.name }</div>
              </>
            ))
          }
        </Swipe>
        <div> You have {} </div>
        <Swipe
          activeItem={ this.state.toWalletNumber }
          changeActiveItem={(num: number) => this.handleChangeWallet(this.state.fromWalletNumber, num)}
          countSteps={ this.state.wallets.length }>
          {
            this.state.wallets.map((wallet) => (
              <>
                <div> { wallet.symbol } { wallet.amount }</div>
                <div> { wallet.code } - { wallet.name }</div>
              </>
            ))
          }
        </Swipe>
        <div> You have {} </div>
        <TextField
          id="standard-password-input"
          label="Value"
          type="number"
          autoComplete="current-password"
          onChange={(event) => this.handleChangeAmount(event)}
        />
        <div> Enter: {this.state.exchangedAmount} </div>
        <div> Result: {this.state.convertedAmount} </div>
        <Buttons buttons={buttons} />
      </>
    );
  }
}