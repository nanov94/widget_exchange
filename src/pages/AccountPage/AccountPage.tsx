import React, { Component } from 'react';
import Buttons, { ButtonData } from '../../components/Buttons/Buttons';
import HistoryOperationsPocket from '../../components/HistoryOperationsPocket/HistoryOperationsPocket';
import Pockets from '../../components/Pockets/Pockets';
import { ActionButtons, Operations } from '../../constants';
import { Route } from 'react-router-dom'

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

  handleButtonClick = (historyPush: (route: string) => void, action: string) => {
    historyPush(`/${action}`);
  }

  getActionButtons() {
    const { operations } = this.state;

    return [
      { button: operations[Operations.TOP_UP], actionData: ActionButtons.topup },
      { button: operations[Operations.EXCHANGE], actionData: ActionButtons.exchange },
      { button: operations[Operations.BANK], actionData: ActionButtons.bank }
    ];
  }

  render() {
    const buttons = this.getActionButtons();

    return (
      <div className="wrapAccountPage">
        <div className="wrapPocketPanel">
          <Pockets></Pockets>
          <Route render={({ history}) => (
              <Buttons class="wrapAccountButton" buttonData={buttons} handleClick={(event: ButtonData) => this.handleButtonClick(history.push, event.actionData)} />
            )}
          />
        </div>
        <div className="wrapHistoryPanel">
          <HistoryOperationsPocket operationIcons={ this.state.operations }></HistoryOperationsPocket>
        </div>
      </div>
    );
  }
}
