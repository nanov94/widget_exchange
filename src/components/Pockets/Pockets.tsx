import React, { Component } from "react";
import Swipe from "../Swipe/Swipe";
import { connect } from 'react-redux';
import { Currencies } from "../../models/Currency";
import { changeActiveWallet } from "../../actions/pocketAction";

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
          return (
            <>
              <div> { wallet.symbol } { wallet.amount }</div>
              <div> { wallet.code } - { wallet.name }</div>
            </>
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