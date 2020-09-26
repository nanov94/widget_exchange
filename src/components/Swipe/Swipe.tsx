import React, { Component } from "react";
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';

import './Swipe.scss';

interface SwipeProps {
  activeItem: number;
  changeActiveItem: (item: number) => void;
  countSteps: number;
}

class Swipe extends Component<SwipeProps> {
  render() {
    const { activeItem, changeActiveItem, countSteps } = this.props;

    return (<>
      <SwipeableViews
        axis={'x'}
        index={activeItem}
        onChangeIndex={changeActiveItem}
        enableMouseEvents>
          { this.props.children }
      </SwipeableViews>
      <MobileStepper
        classes={ undefined }
        className="swipeDots"
        variant="dots"
        steps={countSteps}
        position="static"
        activeStep={activeItem}
        nextButton={null}
        backButton={null}
      />
    </>);
  }
}

export default Swipe;