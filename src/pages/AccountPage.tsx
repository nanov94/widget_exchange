import React, { Component } from 'react';
import Buttons from '../components/Buttons/Buttons';
import HistoryOperationsPocket from '../components/HistoryOperationsPocket/HistoryOperationsPocket';
import Pockets from '../components/Pockets/Pockets';

import ArrowRightAltSharpIcon from '@material-ui/icons/ArrowRightAltSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import LoopSharpIcon from '@material-ui/icons/LoopSharp';

export default class AccountPage extends Component {

  getButtons() {
    return [<AddSharpIcon />, <LoopSharpIcon />, <ArrowRightAltSharpIcon />];
  }

  render() {
    const buttons = this.getButtons();

    return (
      <>
        <Pockets></Pockets>
        <Buttons buttons={buttons} />
        <HistoryOperationsPocket></HistoryOperationsPocket>
      </>
    );
  }
}