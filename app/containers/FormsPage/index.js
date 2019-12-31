/**
 *
 * FormsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import globalScope from 'globalScope';
import { dataDig, /* dataChecking, setCookieEvents, */Events } from 'globalUtils';

import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Backdrop,
    Box,
    Button,
    // Card,
    CircularProgress,
    Container,
    Grid,
    Toolbar,
} from '@material-ui/core';

import ProductCard from 'components/ProductCard';

import * as actions from './actions';
import makeSelectFormsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import styles from './materialStyle';

const formSetting = [
    {
        type: 'product',
        title: 'Select Product',
    },
    {
        type: 'addressInfo',
        title: 'Delivery Info',
    },
    {
        type: 'userInfo',
        title: 'Contact Info',
    },
    {
        type: 'payment',
        title: 'Select Payment',
    },
];

// const mockData = {
//     selected_product: 45980,
//     email: 'ac@g.com',
//     sms_prefix: '+6011',
//     sms_number: '12345678',
//     otp: '',
//     receiver_name: 'Lim Tien Ping',
//     line_1: '2606',
//     line_2: 'Sky Oasis',
//     line_3: 'Jalan Setia Indah',
//     city: 'Johor Bahru',
//     postal_code: '81100',
//     state_code: 'MY-01',
// };

// const initialState = {
//     // selected_product: 45980,
//     email: '',
//     sms_prefix: '+6010',
//     sms_number: '',
//     otp: '',
//     receiver_name: '',
//     line_1: '',
//     line_2: '',
//     line_3: '',
//     city: '',
//     postal_code: '',
//     state_code: 'MY-01',
// };

export class FormsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            // ,,,mockData,
            // ...initialState,
            pageIndex: 0,
            // formId: dataChecking(this.props, 'match', 'params', 'id'),
        };
    }

    componentDidMount = () => {
        Events.trigger('hideHeader', {});
        Events.trigger('hideFooter', {});
        this.props.dispatch(actions.getProductList({ id: 8328 }));
        // this.props.dispatch(actions.getConfig());
    }
    renderLoading = () => (
        <Backdrop className={this.props.classes.loader} open={true}>
            <CircularProgress />
        </Backdrop>
    )
    renderAppBar = () => {
        const onClickPrev = () => {
            this.setState((state) => ({ pageIndex: state.pageIndex - 1 }));
        };
        const onClickNext = () => {
            this.setState((state) => ({ pageIndex: state.pageIndex + 1 }));
        };
        const disablePrev = !!(this.state.pageIndex === 0);
        const disableNext = !!(this.state.pageIndex === formSetting.length - 1);
        return (
            <AppBar className="fast-checkout-header" position="static" color="default">
                <Toolbar>
                    <Container className={this.props.classes.header}>
                        <Button className={this.props.classes.prevButton} variant="outlined" color="primary" disabled={disablePrev} aria-label="prev" onClick={onClickPrev}>
                            Prev
                        </Button>
                        <Button className={this.props.classes.nextButton} variant="outlined" color="primary" disabled={disableNext} aria-label="Next" onClick={onClickNext}>
                            Next
                        </Button>
                    </Container>
                </Toolbar>
            </AppBar>
        );
    }

    renderProductList = (products) => (
        <Grid container={true} alignItems="flex-start" spacing={2}>
            {
                products.map((product) => (
                    <Grid key={product.id} item={true} xs={6} md={3}>
                        <ProductCard
                            product={product}
                            image={true}
                            url={product.url}
                            addToCart={true}
                        />
                    </Grid>
                ))
            }
        </Grid>
    )

    renderDeliveryInfo = () => (
        <Box>
            this is delivery
        </Box>
    )

    renderSignUp = () => (
        <Box>
            this is sign
        </Box>
    )

    renderPayment= () => (
        <Box>
            this is payment
        </Box>
    )

    renderFormPage = () => {
        const items = dataDig(this.props.formsPage.productList, 'data.product.result.items');
        switch (dataDig(formSetting[this.state.pageIndex], 'type')) {
            case 'product':
                if (dataDig(items, 'length')) {
                    return this.renderProductList(items);
                }
                return this.renderLoading();
            case 'addressInfo': return this.renderDeliveryInfo();
            case 'userInfo': return this.renderSignUp();
            case 'payment': return this.renderPayment();
            default: return <Box>Unknown page index</Box>;
        }
    }

    render = () => (
        <Box className="fast-checkout-page">
            <Box className="ppf-version">
                {globalScope.formVersion}
            </Box>
            {this.renderAppBar()}
            <Container className="fast-checkout-content my-1">
                {this.renderFormPage()}
            </Container>
        </Box>
    );
}

FormsPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    formsPage: makeSelectFormsPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'formsPage', reducer });
const withSaga = injectSaga({ key: 'formsPage', saga });

export default compose(
    withReducer,
    withSaga,
    withStyles(styles),
    withConnect,
)(FormsPage);
