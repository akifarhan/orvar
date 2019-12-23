/**
 *
 * Example
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import globalScope from 'globalScope';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Carousel from 'components/Carousel';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectExample from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';


export class Example extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

    render() {
        const settings = {
            dots: true,
        };
        return (
            <div className="p-3">
                <Slider {...settings}>
                    <div>Halu</div>
                    <div>Jon</div>
                    <div>Don</div>
                </Slider>
                <Carousel settings={settings}>
                    <div>Halu</div>
                    <div>Jon</div>
                    <div>Halu</div>
                </Carousel>
                <Carousel className="pt-3" settings={settings}>
                    <img src="http://placekitten.com/g/400/200" alt="1" />
                    <img src="http://placekitten.com/g/400/200" alt="1" />
                    <img src="http://placekitten.com/g/400/200" alt="1" />
                </Carousel>
            </div>
        );
    }
}

Example.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    example: makeSelectExample(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'example', reducer });
const withSaga = injectSaga({ key: 'example', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Example);
