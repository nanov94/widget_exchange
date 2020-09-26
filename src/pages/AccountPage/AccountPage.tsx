import React, { Component } from 'react';
import Buttons from '../../components/Buttons/Buttons';
import HistoryOperationsPocket from '../../components/HistoryOperationsPocket/HistoryOperationsPocket';
import Pockets from '../../components/Pockets/Pockets';
import { Operations } from '../../constants';

import ArrowRightAltSharpIcon from '@material-ui/icons/ArrowRightAltSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import LoopSharpIcon from '@material-ui/icons/LoopSharp';

import './AccountPage.scss';

export default class AccountPage extends Component {
  state = {
    operations: {
      [Operations.EXCHANGE]: <LoopSharpIcon />,
      [Operations.TOP_UP]: <AddSharpIcon />,
      [Operations.BANK]: <ArrowRightAltSharpIcon />,
    },
  }

  getActionButtons() {
    const { operations } = this.state;
    return [operations[Operations.TOP_UP], operations[Operations.EXCHANGE], operations[Operations.BANK]];
  }

  render() {
    const buttons = this.getActionButtons();

    return (
      <div className="wrapAccountPage">
        <div className="wrapPocketPanel">
          <Pockets></Pockets>
          <Buttons class="wrapAccountButton" buttons={buttons} handleClick={( ) => {}} />
        </div>
        <div className="wrapHistoryPanel">
          <HistoryOperationsPocket operationIcons={ this.state.operations }></HistoryOperationsPocket>
        </div>
      </div>
    );
  }
}