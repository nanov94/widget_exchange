import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton/IconButton';

interface ButtonsProps {
  class: string;
  buttons: any[];
  handleClick: (event: any) => void;
}

class Buttons extends Component<ButtonsProps> {
  render() {
    return (<div className={ this.props.class }>
        {
          this.props.buttons.map((btn: any) => 
            <IconButton className="accountButton" color="primary" aria-label="upload picture" component="span" onClick={() => this.props.handleClick(btn)}>
              { btn }
            </IconButton>
          )
        }
      </div>);
  }
}

export default Buttons;