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
import { dataDig, Events } from 'globalUtils';

import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Backdrop,
    Badge,
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    OutlinedInput,
    Select,
    Toolbar,
    Typography,
} from '@material-ui/core';
import {
    ShoppingCart,
} from '@material-ui/icons';

import AddressForm from 'components/AddressForm';
import InputForm from 'components/InputForm';
import PopupDialog from 'components/PopupDialog';
import ProductCard from 'components/ProductCard';
import ProductSummary from 'components/ProductSummary';

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
        type: 'confirmOrder',
        title: 'Confirm Order',
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

const initialState = {
    // selected_product: 45980,
    email: '',
    sms_prefix: '+6010',
    sms_number: '',
    otp: '',
    receiver_name: '',
    line_1: '',
    city: '',
    postal_code: '',
    state_code: 'MY-01',
};

export class FormsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            // ,,,mockData,
            ...initialState,
            pageIndex: 0,
            cart: [],
            popup: false,
            // formId: dataChecking(this.props, 'match', 'params', 'id'),
        };
    }

    componentDidMount = () => {
        Events.trigger('hideHeader', {});
        Events.trigger('hideFooter', {});
        this.props.dispatch(actions.getProductList({ id: 8758 }));
        this.props.dispatch(actions.getConfig());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.formsPage.otp.success !== this.props.formsPage.otp.success && nextProps.formsPage.otp.success) {
            this.setState({
                otpSent: true,
                canResend: false,
                sendSuccess: true,
                timer: nextProps.formsPage.otp.data.data.ttl,
            });

            if (this.state.sendClick) {
                this.resendTimer(nextProps.formsPage.otp.data.data.ttl);
            }
        }
        // if (nextProps.formsPage.signup.data !== this.props.formsPage.signup.data && nextProps.formsPage.signup.success) {
        //     if (globalScope.token) {
        //         const { receiver_name, line_1, city, postal_code, state_code, sms_number, sms_prefix } = this.state;
        //         this.props.dispatch(actions.addAddress({ receiver_name, line_1, city, postal_code, state_code, sms_number, sms_prefix }));
        //     } else {
        //         alert('Signup failed');
        //     }
        // }
    }

    onClear = (event) => {
        this.setState({ [event.target.id]: '' });
    }

    handleAddToCart = (item) => {
        this.setState((state) => ({ cart: [...state.cart, item] }));
    }

    handleChange = (event, MAX) => {
        if (MAX) {
            if (event.target.value.length < MAX) {
                this.setState({ [event.target.id]: event.target.value });
            }
        } else {
            this.setState({ [event.target.id]: event.target.value });
        }
    }

    handleChangeNumber = (event, MAX = 15) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < MAX) {
            this.setState({ [event.target.id]: onlyNums });
        }
    }

    resendTimer = (RESEND_TIME) => {
        const interval = setInterval(() => {
            if (this.state.timer > 0) {
                this.setState((prevState) => ({
                    timer: prevState.timer - 1,
                }));
            } else {
                clearInterval(interval);
                this.setState(() => ({
                    canResend: true,
                    timer: RESEND_TIME,
                    sendClick: false,
                    sendSuccess: false,
                }));
            }
        }, 1000);
        return (interval);
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
        const disableNext = () => {
            const { receiver_name, line_1, city, postal_code, state_code } = this.state;
            switch (dataDig(formSetting[this.state.pageIndex], 'type')) {
                case 'product':
                    return !(this.state.cart > 0);
                case 'addressInfo' :
                    if (receiver_name !== '' && line_1 !== '' && city !== '' && postal_code !== '' && state_code !== '') {
                        return false;
                    }
                    return true;
                case 'confirmOrder':
                    return !dataDig(globalScope, 'token');
                default:
                    return !!(this.state.pageIndex === formSetting.length - 1);
            }
        };

        return (
            <AppBar className="fast-checkout-header" position="static" color="default">
                <Toolbar>
                    <Container className={this.props.classes.header}>
                        {
                            this.state.pageIndex === 0 ?
                                <IconButton>
                                    <Badge
                                        color="secondary"
                                        badgeContent={this.state.cart.length}
                                        invisible={this.state.cart.length === 0}
                                    >
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                                :
                                <Button className={this.props.classes.prevButton} variant="outlined" color="primary" disabled={disablePrev} aria-label="prev" onClick={onClickPrev}>
                                    Prev
                                </Button>
                        }
                        <Button type="submit" className={this.props.classes.nextButton} variant="outlined" color="primary" disabled={disableNext()} aria-label="Next" onClick={onClickNext}>
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
                            addToCart={() => this.handleAddToCart(product.id)}
                            onClickImage={() => {
                                this.props.dispatch(actions.getProduct({ id: product.id }));
                                this.setState({ popup: true, dialogType: 'productInfo' });
                            }}
                        />
                    </Grid>
                ))
            }
        </Grid>
    )

    renderDeliveryInfo = () => {
        const statesList = () => {
            if (!dataDig(this.props.formsPage, 'config.data.state.items.length')) {
                return null;
            }
            return this.props.formsPage.config.data.state.items.map((item, index) => (
                <option key={index} value={item.value}>
                    {item.name}
                </option>
            ));
        };
        return (
            <Box className="address-form">
                <AddressForm
                    handleChange={this.handleChange}
                    onClear={this.onClear}
                    state={this.state}
                    statesList={statesList()}
                    handleChangePostCode={(event) => this.handleChangeNumber(event, 6)}
                    handleChangeCity={(event) => this.handleChange(event, 51)}
                    hideExtra={true}
                />
            </Box>
        );
    }

    renderSignUp = () => {
        const { sms_number, sms_prefix, email, otp } = this.state;
        const smsPrefixList = () => {
            if (!dataDig(this.props.formsPage, 'config.data.mobile_prefix.items.length')) {
                return null;
            }
            return this.props.formsPage.config.data.mobile_prefix.items.map((item, index) => (
                <option key={index} value={item.value}>
                    {item.name}
                </option>
            ));
        };
        const handleSendOTP = () => {
            if (sms_number && sms_prefix) {
                this.props.dispatch(actions.sendOTP({ sms_prefix, sms_number }));
                this.setState({ sendClick: true });
            }
        };
        const handleSubmit = () => {
            event.preventDefault();
            const password = `${email.substr(0, 4).toUpperCase()}${otp}`;
            this.props.dispatch(actions.signUp({ sms_prefix, sms_number, email, tac: otp, password, password_confirmation: password }));
        };
        return (
            <Box className={this.props.classes.contact}>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth={true}>
                        <InputForm
                            label="Email address"
                            id="email"
                            type="email"
                            handleChange={this.handleChange}
                            value={this.state.email}
                            onClear={this.onClear}
                        />
                    </FormControl>
                    <InputLabel className="text-capitalize pb-half">Mobile number</InputLabel>
                    <Grid container={true} direction="row" justify="space-around" align="stretch">
                        <Grid item={true} xs={4} sm={3}>
                            <FormControl variant="outlined">
                                <Select
                                    native={true}
                                    id="sms_prefix"
                                    value={this.state.sms_prefix}
                                    onChange={this.handleChange}
                                    input={<OutlinedInput />}
                                    required={true}
                                >
                                    {smsPrefixList()}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item={true} xs={8} sm={9}>
                            <FormControl>
                                <InputForm
                                    id="sms_number"
                                    handleChange={this.handleChangeNumber}
                                    value={this.state.sms_number}
                                    placeholder="e.g. 7654321"
                                    onClear={this.onClear}
                                    onClick={handleSendOTP}
                                    requestOTP={true}
                                    canResend={this.state.canResend}
                                    otpSent={this.state.otpSent}
                                    timer={this.state.timer}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <FormControl fullWidth={true}>
                        <InputForm
                            label="OTP Number"
                            variant="outlined"
                            id="otp"
                            placeholder="e.g. 01234"
                            handleChange={(event) => this.handleChangeNumber(event, 6)}
                            value={this.state.otp}
                            onClear={this.onClear}
                        />
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Box>
        );
    }

    renderConfirmOrder = () => (
        <Box>
            Please confirm your order
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
                } else if (dataDig(this.props.formsPage.productList, 'error')) {
                    return (
                        <Typography>{this.props.formsPage.productList.data.messages[0].text}</Typography>
                    );
                }
                return this.renderLoading();
            case 'addressInfo': return this.renderDeliveryInfo();
            case 'confirmOrder':
                if (dataDig(globalScope, 'token')) {
                    return this.renderConfirmOrder();
                }
                return this.renderSignUp();
            case 'payment': return this.renderPayment();
            default: return <Box>Unknown page index</Box>;
        }
    }

    renderProductInfo = (product) => {
        const content = () => {
            if (dataDig(product, 'data')) {
                return (
                    <ProductSummary
                        product={product.data}
                        addToCart={() => this.handleAddToCart(product.data.id)}
                        notifyMe={true}
                    />
                );
            }
            if (dataDig(product, 'error')) {
                return <Box>Product not found</Box>;
            }
            return <Box className={this.props.classes.productLoading}><CircularProgress /></Box>;
        };
        return (
            <Box className={this.props.classes.productInfo}>
                {content()}
            </Box>
        );
    }

    renderDialogContent = () => {
        switch (this.state.dialogType) {
            case 'productInfo': return this.renderProductInfo(this.props.formsPage.product);
            default: return null;
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
            <PopupDialog
                display={this.state.popup}
                onClose={() => this.setState({ popup: false })}
                fullWidth={true}
            >
                {this.renderDialogContent()}
            </PopupDialog>
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
