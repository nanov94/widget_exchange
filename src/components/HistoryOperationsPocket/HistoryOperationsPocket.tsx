import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { OperationHistory } from "../../models/OperationHistory";
import { getOperationMessage, messages, Operations } from "../../constants";
import { connect } from "react-redux";
import { getOperationDate } from "../../utils/date";
import { Currencies } from "../../models/Currency";

import './HistoryOperationsPocket.scss';

interface HistoryOperationsPocketStateToProps {
  history: OperationHistory[],
  walletData: Currencies[];
}

interface HistoryOperationsPocketBaseProps {
  operationIcons: { [key: number]: any; };
}

type HistoryOperationsPocketProps = HistoryOperationsPocketBaseProps & HistoryOperationsPocketStateToProps;

class HistoryOperationsPocket extends Component<HistoryOperationsPocketProps> {
  getListItem = (operation: OperationHistory, id: number) => {
    const { fromWalletCode, toWalletCode, fromWalletAmount, toWalletAmount } = operation.dataset;
    const operationDate = getOperationDate(operation.date);

    switch(operation.typeOfOperation) {
      case Operations.EXCHANGE:
        return (
          <ListItem key={ id }>
            <ListItemAvatar className="operationIcon">
              { this.props.operationIcons[operation.typeOfOperation] }
            </ListItemAvatar>
            <ListItemText primary={ getOperationMessage(operation.typeOfOperation, toWalletCode) } secondary={ operationDate } />
            <div className="wrapAmountChanges">
              <div className="toAmountChanges">+{ this.props.walletData[toWalletCode].symbol }{ toWalletAmount }</div>
              <div className="fromAmountChanges">-{ this.props.walletData[fromWalletCode].symbol }{ fromWalletAmount }</div>
            </div>
            
          </ListItem>
        )
      default:
        break;
    }
  }
  
  render() {
    const { history } = this.props;
    let today = new Date().toLocaleDateString();

    return <>
      <div className="today"> { today } </div>

      <List className="operationsHistory">
        {
          history.length
            ? history.map((record: OperationHistory, id: number) => this.getListItem(record, id))
          : <div className="historyIsEmpty"> { messages.historyIsEmpty } </div>
        }
      </List>
    </>;
  }
}

const mapStateToProps = (state: any, ownProps: HistoryOperationsPocketBaseProps) => {
  const historyOperationsPocketStateToProps: HistoryOperationsPocketStateToProps = {
    history: state.pocket.history,
    walletData: state.pocket.walletData,
  }

  return {
    ...historyOperationsPocketStateToProps,
    ...ownProps,
  };
}

export default connect(mapStateToProps)(HistoryOperationsPocket);