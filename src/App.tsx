import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import AccountPage from './pages/AccountPage';
import CardPage from './pages/CardPage';

class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Route path="/account" component={AccountPage}/>
          <Route path="/card" component={CardPage}/>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
