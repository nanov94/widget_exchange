import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { CurrencyDTO, ListOfCurrencyDTO } from '../../client/DTOs/ListOfCurrency';
import { getListOfCurrency } from '../../client/CurrencyExchangeRapidapiServiceClient';

import './TopUpPage.scss';
import { bindActionCreators } from 'redux';
import actions from '../../actions';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { NavigationButtons } from '../../constants';

interface TopUpPageDispatchToProps {
  addWallet: (code: string, name: string, symbol: string) => void;
}

class TopUpPage extends Component<TopUpPageDispatchToProps> {
  state = {
    currencies: [],
  }

  componentWillUnmount() {

  }

  componentDidMount() {
    getListOfCurrency()
    .then((result: ListOfCurrencyDTO) => {
      const currencyArray: any[] = [];

      for (const key of Object.keys(result)) {
        currencyArray.push(this.getListItem(result[key]));
      }

      this.setState((state) => ({
        currencies: currencyArray,
      }))
    })
    .catch((error: any) => console.log(`Server is not available! Error: ${error}.`));
  }

  handlerChooseWallet = (code: string, name: string, symbol: string) => {
    this.props.addWallet(code, name, symbol);
  }

  getListItem = (currency: CurrencyDTO) => {
    const symbol = currency.currencySymbol || '';
    const name = `${currency.id} ${symbol ? `(${symbol})` : ''}`;
    return (
      <ListItem key={ currency.id } button onClick={() => this.handlerChooseWallet(currency.id, currency.currencyName, symbol)}>
        <ListItemText primary={ name } secondary={ currency.currencyName } />
      </ListItem>
    );
  }

	render() {
		return <>
      <div className="today"> Add new wallet </div>

      <div className="wrapCurrencyList">
        <Route render={({ history }) => (
            <List onClick={() => history.push(`/${NavigationButtons.account}`)}>
              { this.state.currencies }
            </List>
          )}
        />
      </div>
    </>;
	}
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(actions, dispatch);
}

export default connect(null, mapDispatchToProps)(TopUpPage);