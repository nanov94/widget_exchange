import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton/IconButton';

interface ButtonsPropsComponent {
  buttons: any;
}

class Buttons extends Component<ButtonsPropsComponent> {

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