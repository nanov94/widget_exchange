import React, { Component } from "react";
import Swipe from "../Swipe/Swipe";
import { connect } from 'react-redux';
import { Currencies } from "../../models/Currency";
import { changeActiveWallet } from "../../actions/pocketAction";

import './Pockets.scss';

interface PocketStateToProps {
  activeWalletNumber: number;
  walletData: Currencies;
  wallets: string[];
}

interface PocketDispatchToProps {
  changeActiveWallet: any;
}

type PocketProps = PocketStateToProps & PocketDispatchToProps;

class Pockets extends Component<PocketProps> {
  handleChangeWallet = (walletNumber: number) => {
    this.props.changeActiveWallet(walletNumber);
    this.setState((state) => ({ activeWalletNumber: walletNumber }));
  };

  render() {
    return (<Swipe
      activeItem={ this.props.activeWalletNumber }
      changeActiveItem={(num: number) => this.handleChangeWallet(num)}
      countSteps={ this.props.wallets.length }>
      {
        this.props.wallets.map((walletKey) => {
          const wallet = this.props.walletData[walletKey];
          const mainAmount = Math.trunc(wallet.amount);
          const residueAmount = +(wallet.amount % 100).toFixed(0);
          return (
            <div className="wrapWallet">
              <div className="amount">
                <div> { wallet.symbol }</div>
                <div className="mainAmount"> { mainAmount }</div>
                <div> { residueAmount ? '.' + residueAmount : '' }</div>
              </div>
              <div className="currencyName"> { wallet.code } - { wallet.name }</div>
            </div>
          )
        })
      }
    </Swipe>);
  }
}

const mapStateToProps = (state: any) => {
  const { pocket } = state;
  const pocketStateToProps: PocketStateToProps = {
    activeWalletNumber: pocket.activeWalletNumber,
    wallets: pocket.wallets,
    walletData: pocket.walletData,
  }

  return pocketStateToProps;
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeActiveWallet: (args: any) => dispatch(changeActiveWallet(args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pockets);