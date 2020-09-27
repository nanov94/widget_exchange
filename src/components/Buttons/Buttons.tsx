import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton/IconButton';

export interface ButtonData {
  button: any;
  actionData: string;
  disabled?: boolean;
}

interface ButtonsProps {
  class: string;
  buttonData: ButtonData[];
  handleClick: (event: any) => void;
}

class Buttons extends Component<ButtonsProps> {
  render() {
    return (<div className={ this.props.class }>
        {
          this.props.buttonData.map((btn: any, id: number) => {
            const className = btn.disabled === true ? 'disabledAccountButton accountButton' : 'accountButton';
            return (
              <IconButton key={ id } className={ className } color="primary" aria-label="upload picture" component="span" onClick={() => btn.disabled || this.props.handleClick(btn)}>
                { btn.button }
              </IconButton>
            );
          })
        }
      </div>);
  }
}

export default Buttons;