/**
*
* Carousel
*
* After evaluating several packages for carousel; we chose react-slick.
* However, this package still not perfect yet:
* [x] Arrows not on top of the slider
* [x] Arrows icons cannot be changed easily
* [x] Link's click triggered when dragging the carousel
* [] Drag behavior for slidesToScroll remain 1 for centerMode
*/

import React from 'react';
import PropTypes from 'prop-types';
import { dig } from 'globalUtils';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
    Box,
    IconButton,
} from '@material-ui/core';

import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';

import './style.scss';

class Carousel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    swiping = false;

    handleMouseDown = (event) => {
        event.preventDefault();
    };

    handleMouseUp = () => {
        this.swiping = this.slider.innerSlider.state.swiping;
    };

    handleClick = (event) => {
        if (this.swiping) {
            event.preventDefault();
        }
    };


    renderArrows = () => (
        <Box className="slider-arrow">
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
        </Box>
    )

    render = () => {
        const { children } = this.props;
        const settings = {
            ...this.props.settings,
            arrows: false,
        };

        return (
            <Box className={`carousel ${this.props.className ? this.props.className : ''}`} style={{ position: 'relative' }}>
                {this.props.disableArrow ? null : this.renderArrows()}
                <Slider ref={(c) => (this.slider = c)} {...settings}>
                    {
                        React.Children.map(children, (child) => (
                            <Box onClickCapture={this.handleClick} onMouseUpCapture={this.handleMouseUp} onMouseDownCapture={this.handleMouseDown}>
                                {child}
                            </Box>
                        ))
                    }
                </Slider>
            </Box>
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
