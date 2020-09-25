import React, { Component } from "react";
import { currencies } from '../../constants';
import Swipe from "../Swipe/Swipe";

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

class Pockets extends Component {
  state = {
    walletNumber: 0,
    wallets: testCurrencies,
  };

  handleChangeWallet = (walletNumber: number) => {
    this.setState((state) => ({ walletNumber: walletNumber }));
  };

  render() {
    return (<Swipe
      activeItem={ this.state.walletNumber }
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
    </Swipe>);
  }
}

export default Pockets;