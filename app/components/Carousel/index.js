/**
*
* Carousel
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { dig } from 'globalUtils';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import IconButton from '@material-ui/core/IconButton';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

import './style.scss';

class Carousel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    renderArrows = () => (
        <div className="slider-arrow">
            <IconButton
                className="arrow-btn prev"
                onClick={() => this.slider.slickPrev()}
            >
                {
                    dig(this.props, 'prevArrow') ?
                        this.props.prevArrow
                        :
                        <ArrowLeft />
                }
            </IconButton>
            <IconButton
                className="arrow-btn next"
                onClick={() => this.slider.slickNext()}
            >
                {
                    dig(this.props, 'nextArrow') ?
                        this.props.nextArrow
                        :
                        <ArrowRight />
                }
            </IconButton>
        </div>
    )

    render = () => {
        const settings = {
            ...this.props.settings,
            arrows: false,
        };

        return (
            <div className={`carousel ${this.props.className}`}style={{ position: 'relative' }}>
                {this.props.disableArrow ? null : this.renderArrows()}
                <Slider ref={(c) => (this.slider = c)} {...settings}>
                    {this.props.children}
                </Slider>
            </div>
        );
    }
}

Carousel.propTypes = {
    settings: PropTypes.object,
    className: PropTypes.string,
    disableArrow: PropTypes.bool,
    nextArrow: PropTypes.element,
    prevArrow: PropTypes.element,
    children: PropTypes.array.isRequired,
};

export default Carousel;
