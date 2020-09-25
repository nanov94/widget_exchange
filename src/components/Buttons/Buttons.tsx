import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton/IconButton';

interface ButtonsProps {
  buttons: any;
}

class Buttons extends Component<ButtonsProps> {

  render() {
    return (<>
        {
          this.props.buttons.map((btn: any) => 
            <IconButton color="primary" aria-label="upload picture" component="span">
              { btn }
            </IconButton>
          )
        }
      </>);
  }
}

export default Buttons;