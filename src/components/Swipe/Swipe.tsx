import React, { Component } from "react";
import MobileStepper from '@material-ui/core/MobileStepper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss';
import './Swipe.scss';

interface SwipeProps {
  activeItem: number;
  changeActiveItem: (item: number) => void;
  countSteps: number;
  swipeChildren: any[];
}

class Swipe extends Component<SwipeProps> {
  render() {
    const { activeItem, changeActiveItem, countSteps, swipeChildren } = this.props;
    const swipeElements: any[] = [];

    swipeChildren.forEach((child, id) => {
      swipeElements.push(<SwiperSlide key={ id }> { child } </SwiperSlide>);
    });

    return (<>
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      onSlideChange={(item) => changeActiveItem(item.activeIndex)}
    >
      { swipeElements }
    </Swiper>
      <MobileStepper
        classes={ undefined }
        className="swipeDots"
        variant="dots"
        steps={ countSteps }
        position="static"
        activeStep={ activeItem }
        nextButton={ null }
        backButton={ null }
      />
    </>);
  }
}

export default Swipe;