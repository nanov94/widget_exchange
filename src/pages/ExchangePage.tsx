import React, { Component } from 'react';
import Buttons from '../components/Buttons/Buttons';
import { Operations, TextButtons } from '../constants';
import TextField from '@material-ui/core/TextField';
import Swipe from '../components/Swipe/Swipe';
import { getExchangeCurrency } from '../client/CurrencyExchangeRapidapiServiceClient';
import { connect } from 'react-redux';
import { Currencies } from '../models/Currency';
import { bindActionCreators } from 'redux';
import actions from '../actions';

const buttons = [TextButtons.cancel, TextButtons.exchange];

interface ExchangeStateToProps {
  activeWalletNumber: number;
  walletData: Currencies;
  wallets: string[];
}

interface ExchangeDispatchToProps {
  exchange: (fromWalletCode: number, toWalletCode: number, fromWalletAmount: number, toWalletAmount: number) => void;
  updateHistoryPocket: (...args: any[]) => void;
}

type ExchangeProps = ExchangeStateToProps & ExchangeDispatchToProps;

class ExchangePage extends Component<ExchangeProps> {
  state = {
    fromWalletNumber: 0,
    toWalletNumber: 0,
    exchangedAmount: 0,
    convertedAmount: 0,
    fromToRate: 0,
    toFromRate: 0,
  };

  handleChangeWallet = async (fromWalletNumber: number, toWalletNumber: number, exchangedAmount: number = this.state.exchangedAmount) => {
    const { walletData, wallets } = this.props;
    const codeFrom = walletData[wallets[fromWalletNumber]].code;
    const codeTo = walletData[wallets[toWalletNumber]].code;
  
    const exchangeCurrencyFromTo = getExchangeCurrency(codeFrom, codeTo);
    const exchangeCurrencyToFrom = getExchangeCurrency(codeTo, codeFrom);

    this.setState((state) => ({ fromWalletNumber, toWalletNumber }));

    Promise.all([exchangeCurrencyFromTo, exchangeCurrencyToFrom])    
      .then((result: any) => {
        this.setState((state) => ({
          fromToRate: result[0].toFixed(2),
          toFromRate: result[1].toFixed(2),
        }));
        this.setState((state) => ({
          convertedAmount: exchangedAmount * this.state.fromToRate,
          exchangedAmount: exchangedAmount,
        }));
      })
      .catch((error: any) => console.log(`Server is not available! Error: ${error}.`));
  };

  handleChangeAmount = (event: any) => {
    this.handleChangeWallet(this.state.fromWalletNumber, this.state.toWalletNumber, event.target.value);
  }

  handleButtonClick = (button: string) => {
    switch(button) {
      case TextButtons.exchange:
        this.exchangeCurrency();
        break;
      default: break;
    }
  }

  exchangeCurrency = () => {
    const { fromWalletNumber, toWalletNumber, exchangedAmount, convertedAmount } = this.state;
    const { wallets } = this.props;

    this.props.exchange(fromWalletNumber, toWalletNumber, exchangedAmount, convertedAmount);
    this.props.updateHistoryPocket(
      Operations.EXCHANGE,
      wallets[fromWalletNumber],
      wallets[toWalletNumber],
      exchangedAmount,
      convertedAmount);
  }

  render() {
    const { walletData, wallets } = this.props;

    return (
      <>
        <Swipe
          activeItem={ this.state.fromWalletNumber }
          changeActiveItem={(num: number) => this.handleChangeWallet(num, this.state.toWalletNumber)}
          countSteps={ wallets.length }>
          {
            wallets.map((walletKey: string) => {
              const wallet = walletData[walletKey];
              return (
                <>
                  <div> { wallet.symbol } { wallet.amount }</div>
                  <div> { wallet.code } - { wallet.name }</div>
                </>
              )
            })
          }
        </Swipe>
        <div> You have 1{ walletData[wallets[this.state.fromWalletNumber]].symbol }
          = { this.state.toFromRate }{ walletData[wallets[this.state.toWalletNumber]].symbol }
        </div>
        <Swipe
          activeItem={ this.state.toWalletNumber }
          changeActiveItem={(num: number) => this.handleChangeWallet(this.state.fromWalletNumber, num)}
          countSteps={ wallets.length }>
          {
            wallets.map((walletKey) => {
              const wallet = walletData[walletKey];
              return (
                <>
                  <div> { wallet.symbol } { wallet.amount }</div>
                  <div> { wallet.code } - { wallet.name }</div>
                </>
              )
            })
          }
        </Swipe>
        <div> You have 1{ walletData[wallets[this.state.toWalletNumber]].symbol }
          = { this.state.fromToRate }{ walletData[wallets[this.state.fromWalletNumber]].symbol }
        </div>
        <TextField
          id="standard-password-input"
          label="Value"
          type="number"
          autoComplete="current-password"
          onChange={(event) => this.handleChangeAmount(event)}
        />
        <div> Enter: -{this.state.exchangedAmount} </div>
        <div> Result: +{this.state.convertedAmount} </div>
        <Buttons buttons={buttons} handleClick={(event) => this.handleButtonClick(event)}/>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { pocket } = state;
  const pocketStateToProps: ExchangeStateToProps = {
    activeWalletNumber: pocket.activeWalletNumber,
    wallets: pocket.wallets,
    walletData: pocket.walletData,
  }

  return pocketStateToProps;
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePage);