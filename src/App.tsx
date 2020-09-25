import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import BottomNavigationComponent from './components/BottomNavigation/BottomNavigation';
import { NavigationButtons } from './constants';
import AccountPage from './pages/AccountPage';
import CardPage from './pages/CardPage';
import ExchangePage from './pages/ExchangePage';

class App extends Component {
  state = {
    bottomNavigationValue: NavigationButtons.account,
    navigationItems: [NavigationButtons.account, NavigationButtons.card, NavigationButtons.send, NavigationButtons.support, NavigationButtons.profile],
  };

  handleNavigateAction = (newValue: string, open: (route: string) => void) => {
    this.setState((state) => ({
      ...state,
      bottomNavigationValue: newValue,
    }));
    open(`/${newValue}`);
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <Route path={`/${NavigationButtons.account}`} component={ AccountPage }/>
          <Route path={`/${NavigationButtons.card}`} component={ CardPage }/>
          <Route path={`/${NavigationButtons.send}`} component={ CardPage }/>
          <Route path={`/${NavigationButtons.support}`} component={ CardPage }/>
          <Route path={`/${NavigationButtons.profile}`} component={ CardPage }/>
          <Route path={`/exchange`} component={ ExchangePage }/>
          <Route render={(props) => {
            const { history: { push }} = props;
            return (
              <BottomNavigationComponent
                active={this.state.bottomNavigationValue}
                navigateAction={(item: string) => this.handleNavigateAction(item, push)}
                navigationItems={ this.state.navigationItems }
              />
            )
          }}/>
          
        </BrowserRouter>
      </>
    );
  }
}

export default App;
