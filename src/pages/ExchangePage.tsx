import React, { Component } from 'react';
import Buttons from '../components/Buttons/Buttons';
import { currencies, TextButtons } from '../constants';
import TextField from '@material-ui/core/TextField';
import Swipe from '../components/Swipe/Swipe';

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
  };

  handleChangeWallet = (walletNumber: number) => {
    this.setState((state) => ({ walletNumber: walletNumber }));
  };

  render() {
    return (
      <>
        <Swipe
          activeItem={ this.state.fromWalletNumber }
          changeActiveItem={(num: number) => this.handleChangeWallet(num)}
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
        <Swipe
          activeItem={ this.state.toWalletNumber }
          changeActiveItem={(num: number) => this.handleChangeWallet(num)}
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
        <TextField
          id="standard-password-input"
          label="Value"
          type="number"
          autoComplete="current-password"
        />
        <Buttons buttons={buttons} />
      </>
    );
  }
}