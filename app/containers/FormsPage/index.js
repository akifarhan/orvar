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

import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
    AppBar,
    Backdrop,
    Badge,
    Box,
    Button,
    CircularProgress,
    Container,
    DialogActions,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    Grid,
    // Hidden,
    IconButton,
    InputLabel,
    Link,
    MobileStepper,
    OutlinedInput,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Snackbar,
    Toolbar,
    Tooltip,
    Typography,
} from '@material-ui/core';
import {
    Close,
    Edit,
    ExpandLess,
    ExpandMore,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    ShoppingCart,
} from '@material-ui/icons';

import AddressForm from 'components/AddressForm';
import Cart from 'components/Cart';
import InputForm from 'components/InputForm';
import PopupDialog from 'components/PopupDialog';
import ProductCard from 'components/ProductCard';
import ProductDetails from 'components/ProductDetails';

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
        title: 'Where do you want us to deliver?',
    },
    {
        type: 'confirmOrder',
        title1: 'Confirm your details',
        title2: 'How can we contact you?',
    },
    {
        type: 'payment',
        title: 'Choose payment method',
    },
];

const mockData = {
    email: 'ac@g.com',
    sms_prefix: '+6011',
    sms_number: '12345678',
    otp: '',
    receiver_name: 'Lim Tien Ping',
    line_1: '2606',
    city: 'Johor Bahru',
    postal_code: '81100',
    state_code: 'MY-01',
};
const PROMOTION_ID = 8722;
const CURRENCY = 'RM';
// const initialState = {
//     cart: [],
//     email: '',
//     sms_prefix: '+6010',
//     sms_number: '',
//     otp: '',
//     receiver_name: '',
//     line_1: '',
//     city: '',
//     postal_code: '',
//     state_code: 'MY-01',
// };

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                borderTopRightRadius: '2rem',
                borderTopLeftRadius: '2rem',
                marginBottom: '4rem',
            },
        },
    },
});

export class FormsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            ...mockData,
            // ...initialState,
            cart: [],
            loading: {
                status: false,
                message: null,
            },
            pageIndex: 0,
            total: null,
            // openCart: true, // [TEST] => ITEM IN CART
            openCart: false,
            openConfirmAlert: false,
            // openProduct: true,  // [TEST] => PRODUCT DETAILS TEST
            openProduct: false,
            openSnackBar: false,
            openSummary: false,
            editInfo: false,
            subtotal: 0,
            shippingTotal: null,
            activeStep: 0,
            paymentId: '',
            voucherCode: '',
            // formId: dataChecking(this.props, 'match', 'params', 'id'),
        };
    }

    componentDidMount = () => {
        Events.trigger('hideHeader', {});
        Events.trigger('hideFooter', {});
        this.props.dispatch(actions.getProductList({ url: `/mall/list?promotion_id=${PROMOTION_ID}` }));
        this.props.dispatch(actions.getConfig());
        // this.props.dispatch(actions.getProduct({ id: 45710 })); // [TEST] => PRODUCT DETAILS TEST
    }

    componentWillReceiveProps(nextProps) {
        const resendTimer = (RESEND_TIME) => {
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
        };
        if (nextProps.formsPage.loading !== this.props.formsPage.loading && nextProps.formsPage.loading) {
            this.setState({ loading: nextProps.formsPage.loading });
        }
        if (nextProps.formsPage.otp.success !== this.props.formsPage.otp.success && nextProps.formsPage.otp.success) {
            this.setState({
                otpSent: true,
                canResend: false,
                sendSuccess: true,
                timer: nextProps.formsPage.otp.data.data.ttl,
            });

            if (this.state.sendClick) {
                resendTimer(nextProps.formsPage.otp.data.data.ttl);
            }
        }
        if (nextProps.formsPage.cart !== this.props.formsPage.cart && nextProps.formsPage.cart) {
            let subtotal = 0;
            const calculateSubtotal = (newCart) => {
                newCart.forEach((item) => {
                    subtotal += (item.product.price.selling * item.qty);
                });
            };
            if (dataDig(nextProps.formsPage, 'cart.length')) {
                calculateSubtotal(nextProps.formsPage.cart);
            }
            this.setState({ cart: nextProps.formsPage.cart, subtotal });
        }
        if (nextProps.formsPage.addAddress.success !== this.props.formsPage.addAddress.success && nextProps.formsPage.addAddress.success) {
            this.setState({ addressAdded: true });
            this.handleAddToCart();
        }

        if (nextProps.formsPage.addToCart.success !== this.props.formsPage.addToCart.success && nextProps.formsPage.addToCart.success) {
            if (dataDig(nextProps.formsPage, 'cart.length') > 0) {
                this.handleAddToCart();
            } else {
                this.props.dispatch(actions.checkout('get'));
                this.setState((state) => ({ pageIndex: state.pageIndex + 1, openConfirmAlert: false }));
            }
        }

        if (nextProps.formsPage.checkout.success !== this.props.formsPage.checkout.success && nextProps.formsPage.checkout.success) {
            const { data } = nextProps.formsPage.checkout;
            const calculateSubtotal = (subtotal) => {
                let result = 0;
                subtotal.forEach((item) => {
                    result += item.subtotal;
                });
                return result;
            };

            this.setState({ subtotal: calculateSubtotal(data.data.summary.subtotal), total: data.data.summary.total, shippingTotal: data.data.summary.shipping.total });

            if (dataDig(data, 'data.delivery.address_id') === null && dataDig(data, 'addresses')) {
                data.data.delivery.address_id = data.addresses[0].id;
                this.props.dispatch(actions.checkout('put', { ...data }));
            } else if (dataDig(data, 'data.delivery.courier_id') === null && dataDig(data, 'data.delivery.courier_options.weekday')) {
                data.data.delivery.courier_id = data.data.delivery.courier_options.weekday[0].id;
                this.props.dispatch(actions.checkout('put', { ...data }));
            } else if (dataDig(data, 'data.delivery.address_id') && dataDig(data, 'data.delivery.courier_id') && dataDig(data, 'data.gateway_id')) {
                this.props.dispatch(actions.postCheckout({ ...data }));
            }
        }
    }

    onClear = (event) => {
        this.setState({ [event.target.id]: '' });
    }

    handleAddToCart = () => {
        const { cart } = this.state;
        if (dataDig(cart, 'length') > 0) {
            const lastItem = cart[cart.length - 1];
            const payload = { id: lastItem.id, qty: lastItem.qty };
            this.props.dispatch(actions.addToCart({ ...payload }, cart));
        }
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

    checkCart = (id) => {
        const { cart } = this.state;
        let result = false;
        if (cart.length) {
            cart.forEach((item) => {
                if (item.id === id) {
                    result = true;
                }
            });
        }
        return result;
    }

    checkRequiredComplete = () => {
        const { receiver_name, line_1, city, postal_code, state_code, sms_number, sms_prefix, cart } = this.state;
        if (receiver_name !== '' && line_1 !== '' && city !== '' && postal_code !== '' && state_code !== '' && sms_number !== '' && sms_prefix !== '' && cart.length !== 0) {
            return false;
        }
        return true;
    }

    smsPrefixList = () => {
        if (!dataDig(this.props.formsPage, 'config.data.mobile_prefix.items.length')) {
            return null;
        }
        return this.props.formsPage.config.data.mobile_prefix.items.map((item, index) => (
            <option key={index} value={item.value}>
                {item.name}
            </option>
        ));
    }

    renderHeader = () => {
        const onClickPrev = () => {
            if (this.state.openCart) {
                return this.setState({ openCart: false });
            } else if (this.state.openProduct) {
                return this.setState({ openProduct: false });
            }
            return this.setState((state) => ({ pageIndex: state.pageIndex - 1 }));
        };
        return (
            <AppBar className={this.props.classes.header} position="fixed" color="default">
                <Toolbar className={this.props.classes.headerBar}>
                    {
                        this.state.openProduct || this.state.pageIndex > 0 || this.state.openCart ?
                            <Box className={this.props.classes.leftHeader} component="span">
                                <IconButton onClick={onClickPrev}>
                                    <KeyboardArrowLeft />
                                </IconButton>
                                {
                                    this.state.openCart
                                    &&
                                    <Box component="span">
                                        <Typography variant="h1" color="primary" display="inline" style={{ fontSize: '2rem' }}>Cart</Typography>
                                        <Typography variant="h2" color="textSecondary" display="inline" style={{ fontSize: '1.9rem' }}> {this.state.cart.length}</Typography>
                                    </Box>
                                }
                            </Box>
                            :
                            <Link href="https://www.hermo.my">
                                <img src={require('images/hermo-logo.png')} alt="Hermo Logo" width="100%" height="100%" />
                            </Link>
                    }
                    {
                        !this.state.openCart
                        &&
                        <IconButton
                            disabled={this.state.cart.length === 0}
                            onClick={() => this.setState((state) => ({ openCart: !state.openCart }))}
                        >
                            <Badge
                                color="secondary"
                                badgeContent={this.state.cart.length}
                                invisible={this.state.cart.length === 0}
                            >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    }
                </Toolbar>
            </AppBar>
        );
    }

    renderFooter = () => {
        const { receiver_name, line_1, city, postal_code, state_code, openCart, cart, pageIndex, total, subtotal, openSummary, editInfo, paymentId } = this.state;
        const checkoutData = dataDig(this.props.formsPage, 'checkout.data');
        const onClickNext = () => {
            if (formSetting[pageIndex].type === 'confirmOrder') {
                return this.setState({ openConfirmAlert: true });
            } else if (formSetting[pageIndex].type === 'payment') {
                if (dataDig(checkoutData, 'data.gateway_id') === null) {
                    checkoutData.data.gateway_id = paymentId;
                }
                return this.props.dispatch(actions.checkout('put', { ...checkoutData }));
            }
            return this.setState((state) => ({ pageIndex: state.pageIndex + 1 }));
        };
        const disableNext = () => {
            if (openCart) {
                return this.checkRequiredComplete();
            }
            switch (dataDig(formSetting[pageIndex], 'type')) {
                case 'product':
                    return !(cart.length > 0);
                case 'addressInfo' :
                    if (editInfo) {
                        return this.checkRequiredComplete();
                    } else if (receiver_name !== '' && line_1 !== '' && city !== '' && postal_code !== '' && state_code !== '') {
                        return false;
                    }
                    return true;
                case 'confirmOrder':
                    return this.checkRequiredComplete();
                case 'payment':
                    if (paymentId !== '') {
                        return false;
                    }
                    return true;
                default:
                    return !!(pageIndex === formSetting.length - 1);
            }
        };
        const buttonText = () => {
            if (openCart || formSetting[pageIndex].type === 'confirmOrder') {
                return 'Checkout';
            } else if (formSetting[pageIndex].type === 'payment') {
                return 'Pay now';
            }
            return 'Next';
        };
        return (
            <AppBar className={this.props.classes.footer} position="fixed" color="default">
                <Toolbar className={this.props.classes.footerBar} >
                    <Box className={this.props.classes.footerPrice} style={{ order: `${openCart ? '2' : ''}` }}>
                        <Typography variant="subtitle1" display="inline">{dataDig(this.state, 'total') ? 'Total' : 'Subtotal'}</Typography>
                        <Typography variant="body1" display="inline" style={{ paddingLeft: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }} component="div">
                            {CURRENCY} {Number(dataDig(this.state, 'total') ? total : subtotal).toFixed(2)}
                        </Typography>
                        <Tooltip title="Summary" aria-label="summary" style={{ order: `${openCart ? '-1' : ''}` }}>
                            <IconButton onClick={() => this.setState((state) => ({ openSummary: !state.openSummary }))}>
                                {
                                    openSummary ?
                                        <ExpandMore />
                                        :
                                        <ExpandLess />
                                }
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Button className={this.props.classes.footerButton} variant="contained" color="secondary" disabled={disableNext()} aria-label="Next" onClick={onClickNext}>
                        {buttonText()}
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }

    renderProductList = (data) => {
        if (this.state.openProduct) {
            const product = dataDig(this.props.formsPage, 'product');
            const addToCart = (item) => {
                this.props.dispatch(actions.updateCart([...this.state.cart, item]));
            };
            const content = () => {
                if (dataDig(product, 'data')) {
                    return (
                        <ProductDetails
                            product={product.data}
                            addToCart={(item) => addToCart(item)}
                            checkCart={this.checkCart}
                        />
                    );
                }
                if (dataDig(product, 'error')) {
                    return <Box>Product not found</Box>;
                }
                return null;
            };
            return (
                <Box className={this.props.classes.productDetails}>
                    {content()}
                </Box>
            );
        }
        return (
            <Container>
                <Grid container={true} alignItems="flex-start" spacing={2}>
                    {
                        data.items.map((product) => (
                            <Grid key={product.id} item={true} xs={6} md={3}>
                                <ProductCard
                                    product={product}
                                    image={true}
                                    onClickImage={() => {
                                        this.props.dispatch(actions.getProduct({ id: product.id }));
                                        this.setState({ openProduct: true });
                                    }}
                                    rating={true}
                                    disableBrandClick={true}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
                <MobileStepper
                    className={this.props.classes.stepper}
                    variant="dots"
                    steps={data._meta.pageCount}
                    position="static"
                    activeStep={this.state.activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={() => {
                                this.props.dispatch(actions.getProductList({ url: data._links.next.href }));
                                this.setState((state) => ({ activeStep: state.activeStep + 1 }));
                            }}
                            disabled={this.state.activeStep === data._meta.pageCount - 1}
                        >
                            Next <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={() => {
                                this.props.dispatch(actions.getProductList({ url: data._links.prev.href }));
                                this.setState((state) => ({ activeStep: state.activeStep - 1 }));
                            }}
                            disabled={this.state.activeStep === 0}
                        >
                            <KeyboardArrowLeft /> Back
                        </Button>
                    }
                />
            </Container>
        );
    }

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
                <Paper>
                    <Container className="py-2">
                        <Typography className="mt-1 mb-2" variant="h4" color="primary" style={{ fontWeight: 'bold' }}>{formSetting[this.state.pageIndex].title}</Typography>
                        <AddressForm
                            handleChange={this.handleChange}
                            onClear={this.onClear}
                            state={this.state}
                            statesList={statesList()}
                            handleChangePostCode={(event) => this.handleChangeNumber(event, 6)}
                            handleChangeCity={(event) => this.handleChange(event, 51)}
                            hideExtra={true}
                        />
                        {
                            this.state.editInfo
                            &&
                            <Box>
                                <InputLabel className="text-capitalize pb-half">Mobile number</InputLabel>
                                <Grid container={true} direction="row" justify="space-around" align="stretch">
                                    <Grid item={true} xs={3}>
                                        <FormControl variant="outlined">
                                            <Select
                                                native={true}
                                                id="sms_prefix"
                                                value={this.state.sms_prefix}
                                                onChange={this.handleChange}
                                                input={<OutlinedInput />}
                                                required={true}
                                            >
                                                {this.smsPrefixList()}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item={true} xs={9}>
                                        <FormControl>
                                            <InputForm
                                                id="sms_number"
                                                handleChange={this.handleChangeNumber}
                                                value={this.state.sms_number}
                                                placeholder="e.g. 7654321"
                                                onClear={this.onClear}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        }
                    </Container>
                </Paper>
            </Box>
        );
    }

    renderSignUp = () => {
        const { sms_number, sms_prefix, email, otp } = this.state;
        const disableSubmit = () => {
            if (sms_number === '' || email === '' || otp === '') {
                return true;
            }
            return false;
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
                <Paper>
                    <Container className="py-2">
                        <Typography className="mt-1 mb-2" variant="h4" color="primary" style={{ fontWeight: 'bold' }}>{formSetting[this.state.pageIndex].title2}</Typography>
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
                                <Grid item={true} xs={3}>
                                    <FormControl variant="outlined">
                                        <Select
                                            native={true}
                                            id="sms_prefix"
                                            value={this.state.sms_prefix}
                                            onChange={this.handleChange}
                                            input={<OutlinedInput />}
                                            required={true}
                                        >
                                            {this.smsPrefixList()}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={9}>
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
                            <Button fullWidth={true} type="submit" variant="contained" color="primary" disabled={disableSubmit()}>
                                Submit
                            </Button>
                        </form>
                    </Container>
                </Paper>
            </Box>
        );
    }

    renderConfirmOrder = () => {
        const { receiver_name, line_1, postal_code, city, state_code, sms_prefix, sms_number, pageIndex } = this.state;
        let state_name = '';
        const info = (title, detail) => (
            <Box>
                <Typography variant="subtitle1" color="textSecondary">{title}</Typography>
                <Typography className="text-capitalize" variant="body1" component="div" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{detail}</Typography>
            </Box>
        );
        if (dataDig(this.props.formsPage.config, 'data.state.items.length')) {
            this.props.formsPage.config.data.state.items.forEach((item) => {
                if (item.value === state_code) {
                    state_name = item.name;
                }
            });
        }
        return (
            <Box>
                <Paper className="mt-1">
                    <Container className="py-2">
                        <Typography className="mt-1 mb-2" variant="h4" color="primary" style={{ fontWeight: 'bold' }}>{formSetting[pageIndex].title1}</Typography>
                        <Paper className="p-1">
                            <IconButton
                                onClick={() => this.setState({ pageIndex: 1, editInfo: true })}
                                style={{ float: 'right' }}
                            >
                                <Edit />
                            </IconButton>
                            {info('Receiver', receiver_name)}
                            {info('Contact', `${sms_prefix}${sms_number}`)}
                            {info('Address', <Box>{line_1},<br />{postal_code}, {city},<br />{state_name}, Malaysia</Box>)}
                        </Paper>
                    </Container>
                </Paper>
            </Box>
        );
    }
    renderPayment= (data) => {
        const checkoutData = dataDig(this.props.formsPage, 'checkout.data');
        const items = data.data.payment.methods[2].items;
        return (
            <Box>
                <Paper className="mt-1">
                    <Container className="py-2">
                        <Typography className="mt-1 mb-2" variant="h4" color="primary" style={{ fontWeight: 'bold' }}>{formSetting[this.state.pageIndex].title}</Typography>
                        <FormControl fullWidth={true}>
                            <RadioGroup
                                aria-label="payment-method"
                                name="payment-method"
                                value={this.state.paymentId}
                                onChange={(event) => this.setState({ paymentId: event.target.value })}
                            >
                                <Box className={this.props.classes.paymentRadio}>
                                    <FormControlLabel value="62" control={<Radio />} label="Boost" />
                                    <img src={items[0].image} alt="Boost" width="72px" height="40px" />
                                </Box>
                                <Box className={this.props.classes.paymentRadio}>
                                    <FormControlLabel value="63" control={<Radio />} label="GrabPay" />
                                    <img src={items[1].image} alt="GrabPay" width="72px" height="40px" />
                                </Box>
                                <Box className={this.props.classes.paymentRadio}>
                                    <FormControlLabel value="67" control={<Radio />} label="Touch 'n Go" />
                                    <img src={items[5].image} alt="Touch 'n Go" width="72px" height="40px" />
                                </Box>
                            </RadioGroup>
                        </FormControl>
                        <Box className="mt-1 p-2">
                            <FormControl fullWidth={true}>
                                <Typography variant="subtitle1" color="primary">Enter promotional code here for great deals!</Typography>
                                <Box className={this.props.classes.voucher}>
                                    <InputForm
                                        label="Voucher Code"
                                        id="voucherCode"
                                        handleChange={this.handleChange}
                                        value={this.state.voucherCode}
                                        onClear={this.onClear}
                                        required="false"
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            checkoutData.data.voucher.code = this.state.voucherCode;
                                            this.props.dispatch(actions.checkout('put', { ...checkoutData }));
                                        }}
                                    >
                                        Use
                                    </Button>
                                </Box>
                            </FormControl>
                            {
                                dataDig(checkoutData, 'data.voucher.messages.length')
                                &&
                                <Typography color={checkoutData.data.voucher.messages[0].type} variant="caption">{checkoutData.data.voucher.messages[0].text}</Typography>
                            }
                        </Box>
                    </Container>
                </Paper>
            </Box>
        );
    }

    renderFormPage = () => {
        const data = dataDig(this.props.formsPage.productList, 'data');
        switch (dataDig(formSetting[this.state.pageIndex], 'type')) {
            case 'product':
                if (dataDig(data, 'items.length')) {
                    return this.renderProductList(data);
                } else if (dataDig(data, 'items.length') === 0) {
                    return <Typography>No product found</Typography>;
                } else if (dataDig(this.props.formsPage.productList, 'error')) {
                    return (
                        <Typography>{this.props.formsPage.productList.data.messages[0].text}</Typography>
                    );
                }
                return null;
            case 'addressInfo': return this.renderDeliveryInfo();
            case 'confirmOrder':
                if (dataDig(globalScope, 'token')) {
                    return this.renderConfirmOrder();
                }
                return this.renderSignUp();
            case 'payment':
                if (dataDig(this.props.formsPage.checkout, 'success')) {
                    return this.renderPayment(this.props.formsPage.checkout.data);
                }
                return null;
            default: return <Box>Unknown page index</Box>;
        }
    }

    renderCart = (cart) => {
        const handleCart = (type, params) => {
            const changeQty = (operation) => {
                cart.forEach((item, count) => {
                    if (count === params) {
                        if (operation === '+') {
                            // eslint-disable-next-line no-param-reassign
                            item.qty += 1;
                        } else if (operation === '-') {
                            // eslint-disable-next-line no-param-reassign
                            item.qty -= 1;
                        }
                    }
                });
            };
            const updateCart = (item = [...cart]) => this.props.dispatch(actions.updateCart(item));
            switch (type) {
                case 'remove':
                    cart.splice(params, 1);
                    updateCart();
                    break;
                case 'removeAll':
                    updateCart([]);
                    break;
                case 'removeMultiple':
                    for (let i = params.length - 1; i >= 0; i--) {
                        cart.splice(params[i], 1);
                    }
                    updateCart();
                    break;
                case 'addQty':
                    changeQty('+');
                    updateCart();
                    break;
                case 'reduceQty':
                    changeQty('-');
                    updateCart();
                    break;
                default:
                    break;
            }
        };
        return (
            <Box>
                <Cart
                    items={this.state.cart}
                    handleCart={handleCart}
                />
            </Box>
        );
    }
    renderSummary = () => {
        const showInfo = (title, value) => (
            <Box className={this.props.classes.summaryContent}>
                <Typography className="text-capitalize" variant="h6" display="inline">
                    {title}:
                </Typography>
                <Typography variant="body1" color="textSecondary" display="inline" style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                    {CURRENCY} {Number(value).toFixed(2)}
                </Typography>
            </Box>
        );
        return (
            <Box className="py-1">
                <Box className={this.props.classes.summaryHeader}>
                    <IconButton onClick={() => this.setState({ openSummary: false })}>
                        <Close />
                    </IconButton>
                    <Typography variant="h5" display="inline">Summary</Typography>
                </Box>
                <Divider />
                <Box className="py-2 px-2">
                    {dataDig(this.state, 'subtotal') !== null && showInfo('subtotal', this.state.subtotal)}
                    {dataDig(this.state, 'shippingTotal') !== null && showInfo('shipping total', this.state.shippingTotal)}
                    {dataDig(this.state, 'total') !== null && showInfo('total', this.state.total)}
                </Box>
            </Box>
        );
    }


    render = () => {
        const { receiver_name, line_1, postal_code, city, state_code, sms_prefix, sms_number } = this.state;
        const addressData = { receiver_name, line_1, postal_code, city, state_code, sms_number, sms_prefix };
        return (
            <Box className="fast-checkout-page">
                {/* <Box className="ppf-version">
                    {globalScope.formVersion}
                </Box> */}
                {this.renderHeader()}
                <Box className={this.props.classes.content}>
                    {
                        this.state.openCart ?
                            this.renderCart(this.state.cart)
                            :
                            this.renderFormPage()
                    }
                </Box>
                <ThemeProvider theme={theme}>
                    <Drawer
                        anchor="bottom"
                        open={this.state.openSummary}
                        onClose={() => this.setState({ openSummary: false })}
                    >
                        {this.renderSummary()}
                    </Drawer>
                </ThemeProvider>
                <Snackbar
                    className={this.props.classes.snackbar}
                    open={this.state.openSnackBar}
                    autoHideDuration={2000}
                    message={<Typography>Item added into cart</Typography>}
                    onClose={() => this.setState({ openSnackBar: false })}
                />
                <PopupDialog
                    display={this.state.openConfirmAlert}
                    onClose={() => this.setState({ openConfirmAlert: false })}
                    title="Confirm?"
                >
                    <Typography variant="body2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam ducimus eaque ut quod. Id nobis consequatur eum eligendi repellendus, maxime quisquam? Amet, debitis saepe! Commodi animi voluptatibus recusandae facere distinctio.</Typography>
                    <DialogActions>
                        <Button
                            onClick={() => this.setState({ openConfirmAlert: false })}
                        >
                            Cancel
                        </Button>
                        <Button
                            autoFocus={true}
                            color="primary"
                            onClick={() => {
                                if (this.state.addressAdded) {
                                    return this.handleAddToCart();
                                }
                                return this.props.dispatch(actions.addAddress({ ...addressData }));
                            }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </PopupDialog>
                <Backdrop className={this.props.classes.loader} open={dataDig(this.state.loading, 'status')}>
                    <Box className={this.props.classes.loaderContent}>
                        <CircularProgress />
                        <Typography className="p-2" variant="body1" style={{ color: 'white' }}>{dataDig(this.state.loading, 'message')}</Typography>
                    </Box>
                </Backdrop>
                {this.renderFooter()}
            </Box>
        );
    }
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
