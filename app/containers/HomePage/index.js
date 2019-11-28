/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { Box, Container, Typography, Button } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { dig } from 'globalUtils';
import makeSelectHomePage from './selectors';
import { getHomeBanner, getFlagship } from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(getHomeBanner());
        this.props.dispatch(getFlagship());
    }

    homeBanner = () => {
        let homeBanner;
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 0 },
                items: 1,
            },
        };

        if (dig(this.props.homePage, 'homeBanner.data.result.items')) {
            homeBanner = dig(this.props.homePage, 'homeBanner.data.result.items').map((item) => (
                <Box key={item.id}>
                    <img
                        src={item.image.desktop}
                        alt={item.id}
                        srcSet={`
                            ${item.image.desktop} 2000w,
                            ${item.image.mobile} 1000w,
                        `}
                        width="100%"
                        height="100%"
                    />
                </Box>
            ));
        }

        return (
            <Box>
                {
                    homeBanner &&
                    <Carousel infinite={true} autoPlay={true} responsive={responsive}>
                        { homeBanner }
                    </Carousel>
                }
            </Box>
        );
    }

    flagship = () => {
        let homeFlagship;
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 770 },
                items: 5,
            },
            mobile: {
                breakpoint: { max: 769, min: 0 },
                items: 2,
            },
        };

        if (dig(this.props.homePage, 'flagship.data.items')) {
            homeFlagship = dig(this.props.homePage, 'flagship.data.items').map((item) => (
                <Box className="mb-1" key={item.id}>
                    <img
                        src={item.brand.logo}
                        alt={item.id}
                        width="100%"
                        height="100%"
                    />
                </Box>
            ));
        }

        return (
            <Box>
                <Box className="mb-1">
                    <Typography className="text-uppercase" align="center" variant="h5" gutterBottom={true}>official flagships stores</Typography>
                    <Typography className="text-uppercase" align="center" variant="subtitle1">authorised & authentic</Typography>
                </Box>
                {
                    homeFlagship &&
                    <Carousel centerMode={true} responsive={responsive}>
                        {homeFlagship}
                    </Carousel>
                }
                <Box className="text-xs-center mb-1">
                    <Button variant="contained" color="primary">
                        view all flagships
                    </Button>
                </Box>
            </Box>
        );
    }

    twoh = () => (
        <Box>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed repudiandae illum sint. Velit quasi adipisci accusamus repellat. Temporibus consequuntur cumque, voluptatem necessitatibus quidem saepe atque quos magnam rerum reprehenderit repellat.
        </Box>
    );

    render = () => (
        <div>
            <Helmet>
                <title>Hermo</title>
                <meta name="description" content="Hermo Malaysia" />
            </Helmet>
            <Box>
                <Box className="mb-1">
                    {this.homeBanner()}
                </Box>
                <Container maxWidth="lg">
                    {this.flagship()}
                    {this.twoh()}
                </Container>
            </Box>
        </div>
    );
}

HomePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HomePage);
