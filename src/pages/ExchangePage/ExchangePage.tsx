import React, { Component } from 'react';
import Buttons, { ButtonData } from '../../components/Buttons/Buttons';
import { errorMessages, NavigationButtons, Operations, TextButtons } from '../../constants';
import TextField from '@material-ui/core/TextField';
import Swipe from '../../components/Swipe/Swipe';
import { getExchangeCurrency } from '../../client/CurrencyExchangeRapidapiServiceClient';
import { connect } from 'react-redux';
import { Currencies } from '../../models/Currency';
import { bindActionCreators } from 'redux';
import actions from '../../actions';
import { Route } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import './ExchangePage.scss';
import { getConvertationCurrencyReate } from '../../utils/currency';

const buttons: ButtonData[] = [
  { button: TextButtons.cancel, actionData: NavigationButtons.account },
  { button: TextButtons.exchange, actionData: NavigationButtons.account }
];

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
    isValidExchangeCurrency: true,
    openToast: false,
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
          fromToRate: +result[0].toFixed(2),
          toFromRate: +result[1].toFixed(2),
        }));
        this.setState((state) => ({
          convertedAmount: +(exchangedAmount * this.state.fromToRate).toFixed(2),
          exchangedAmount: exchangedAmount,
        }));
      })
      .catch((error: any) => console.log(`Server is not available! Error: ${error}.`));
  };

  handleChangeAmount = (event: any) => {
    const { walletData, wallets } = this.props;

    const value = event.target.value;

    if (!Number(value) || value > walletData[wallets[this.state.fromWalletNumber]].amount) {
      this.setState((state) => ({ isValidExchangeCurrency: false, openToast: true }));
      return; 
    }

    this.setState((state) => ({ isValidExchangeCurrency: true, openToast: false }));
    this.handleChangeWallet(this.state.fromWalletNumber, this.state.toWalletNumber, value);
  }

  handleButtonClick = (historyPush: (route: string) => void, buttonData: ButtonData) => {
    const { isValidExchangeCurrency, exchangedAmount } = this.state;

    if (isValidExchangeCurrency && exchangedAmount) {
      switch(buttonData.button) {
        case TextButtons.exchange:
          this.exchangeCurrency();
          break;
        default: break;
      }
    }

    historyPush(`/${buttonData.actionData}`);
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

  handleCloseToast = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState((state) => ({ openToast: false }));
  };

  render() {
    const { walletData, wallets } = this.props;
    const { fromWalletNumber, toWalletNumber, toFromRate, fromToRate, isValidExchangeCurrency, convertedAmount, openToast } = this.state;

    return (
      <div className="wrapExchangePage">
        <div className="wrapWalletPanelFrom">
          <Swipe
            activeItem={ this.state.fromWalletNumber }
            changeActiveItem={(num: number) => this.handleChangeWallet(num, this.state.toWalletNumber)}
            countSteps={ wallets.length }>
            {
              wallets.map((walletKey: string) => {
                const wallet = walletData[walletKey];
                return (
                  <div className="wrapWallet">
                    <div className="wrapAmount">
                      <div className="amountCode">
                        { wallet.code }
                      </div>
                      <div className="amount">
                        <div> You have { wallet.symbol } { wallet.amount }</div>
                        <div>
                          { getConvertationCurrencyReate(walletData, wallets, fromWalletNumber, toWalletNumber, toFromRate) }
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </Swipe>
          <TextField
            className="input"
            id="standard-basic"
            label="Value"
            onChange={(event) => this.handleChangeAmount(event)}
          />
        </div>
        <div className="wrapWalletPanelTo">
          <Swipe
            activeItem={ this.state.toWalletNumber }
            changeActiveItem={(num: number) => this.handleChangeWallet(this.state.fromWalletNumber, num)}
            countSteps={ wallets.length }>
            {
              wallets.map((walletKey) => {
                const wallet = walletData[walletKey];
                return (
                  <div className="wrapWallet">
                    <div className="wrapAmount">
                      <div className="amountCode">
                        { wallet.code }
                      </div>
                      <div className="amount">
                        <div> You have { wallet.symbol } { wallet.amount }</div>
                        <div>
                          { getConvertationCurrencyReate(walletData, wallets, toWalletNumber, fromWalletNumber, fromToRate) }
                          </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </Swipe>
          <TextField
            className='input'
            id="standard-basic"
            disabled
            value={ convertedAmount ? `+${ convertedAmount}` : ''}
          />
        </div>
        <Route render={({ history }) => {
          if (!isValidExchangeCurrency) {
            buttons.forEach((btn) => {
              if (btn.button === TextButtons.exchange) {
                btn.disabled = true;
              }
            });
          } else {
            buttons.forEach((btn) => {
              if (btn.button === TextButtons.exchange) {
                btn.disabled = false;
              }
            });
          }
          
          return (
            <Buttons class='wrapExchangeAccountButton'
              buttonData={buttons}
              handleClick={(event: ButtonData) => this.handleButtonClick(history.push, event)}/>
          );
        }}
        />
        <Snackbar className="toastNotification" open={openToast} autoHideDuration={5000} onClose={this.handleCloseToast}>
          <Alert onClose={this.handleCloseToast} severity="error"> 
            { errorMessages.invalidValue }
          </Alert>
        </Snackbar>
      </div>
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