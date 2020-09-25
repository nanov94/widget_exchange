import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import BottomNavigationComponent from './components/BottomNavigation/BottomNavigation';
import { NavigationButtons } from './constants';
import AccountPage from './pages/AccountPage';
import CardPage from './pages/CardPage';

class App extends Component {
  state = {
    bottomNavigationValue: NavigationButtons.account,
    navigationItems: [NavigationButtons.account, NavigationButtons.card, NavigationButtons.send, NavigationButtons.support, NavigationButtons.profile],
  };

  handleNavigateAction = (newValue: string) => {
    this.setState((state) => ({
      ...state,
      bottomNavigationValue: newValue,
    }));
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <Route path="/account" component={AccountPage}/>
          <Route path="/card" component={CardPage}/>
        </BrowserRouter>
        <BottomNavigationComponent
          active={this.state.bottomNavigationValue}
          navigateAction={(item: string) => this.handleNavigateAction(item)}
          navigationItems={ this.state.navigationItems }
        />
      </>
    );
  }
}

export default App;
