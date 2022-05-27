import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class SimpleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sliderImages } = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };
    return (
      <div>
        <Slider {...settings}>
          {sliderImages.map((data, ind) => {
            return (
              <div key={ind}>
                <img src={data} />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
