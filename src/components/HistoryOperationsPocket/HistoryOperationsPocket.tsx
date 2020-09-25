import React, { Component } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import LoopSharpIcon from '@material-ui/icons/LoopSharp';

class HistoryOperationsPocket extends Component {
  
  render() {
    // const today = new Date();

    return <>
      <div> { 'today' } </div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <LoopSharpIcon />
          </ListItemAvatar>
          <ListItemText primary='Exchange to EUR' secondary='14:14' />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
          <LoopSharpIcon />
          </ListItemAvatar>
          <ListItemText primary='Exchange from EUR' secondary='8 Jan 2020' />
        </ListItem>
      </List>
    </>;
  }
}

export default HistoryOperationsPocket;