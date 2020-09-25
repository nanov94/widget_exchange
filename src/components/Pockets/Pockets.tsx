import React, { Component } from "react";
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import { currencies } from '../../constants';

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
    return <>
      <SwipeableViews
        axis={'x'}
        index={this.state.walletNumber}
        onChangeIndex={this.handleChangeWallet}
        enableMouseEvents>
          {
            this.state.wallets.map((wallet) => (
              <>
                <div> { wallet.symbol } { wallet.amount }</div>
                <div> { wallet.code } - { wallet.name }</div>
              </>
            ))
          }
      </SwipeableViews>
      <MobileStepper
        variant="dots"
        steps={this.state.wallets.length}
        position="static"
        activeStep={this.state.walletNumber}
        nextButton={null}
        backButton={null}
      />
    </>;
  }
}

export default Pockets;