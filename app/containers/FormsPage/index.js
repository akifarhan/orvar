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
    Divider,
    Drawer,
    FormControl,
    Grid,
    Hidden,
    IconButton,
    InputLabel,
    Link,
    MobileStepper,
    OutlinedInput,
    Paper,
    Select,
    Snackbar,
    Toolbar,
    Tooltip,
    Typography,
} from '@material-ui/core';
import {
    Close,
    ExpandLess,
    ExpandMore,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    ShoppingCart,
} from '@material-ui/icons';

import AddressForm from 'components/AddressForm';
import Cart from 'components/Cart';
import InputForm from 'components/InputForm';
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
//     cart: [{ 'id': 43208, 'name': 'Nu Formula Mineral Cleansing Water 510ml', 'plain_name': 'Mineral Cleansing Water', 'display_name': 'Nu Formula Mineral Cleansing Water 510ml', 'extra_name': '510ml', 'prefix_name': '', 'choosable_name': '', 'ingredients': 'Aqua (water), PEG-6 Caprylic/Capric Glycerides, Polyaminopropyl Biguanide, Mineral Water, Pantaenol, Rosa Damascena Flower Water, Lepidium Sativum Sprout(Cress) Extract, Vaccinium Myrtillus(Bilberry) Fruit Extract, Saccharum Officinarum (Sugar cane), Glycerin, Citrus Aurantium Dulcis(orange) Fruit Extract, Citrus Limon(Lemon) Fruit Extract, Lecithin, Acer Saccharum(Sugar Maple) Extract, Chamomile Recutita(Matricaria) Flower Extract, Phenoxyethanol, Disodium EDTA.', 'brief': 'Mineral Micellar Plus + complex, an upgraded technology developed by our skin laboratory. ', 'brand': { 'id': 969, 'name': 'Nu Formula', 'logo': 'https://devshop.hermo.my/images/logos/nu-formula_1565842541.png', 'country_code': 'TH', 'attribute': { 'is_new': false, 'is_flagship': false }, 'url': '/brand/969-nu-formula', '_applink': { 'target': 'new-page', 'type': 'brand', 'id': 969, 'page': { 'id': 'mall-list', 'params': [{ 'key': 'url', 'value': 'https://devapi.hermo.my/v1/brand/969' }] } }, '_links': { 'self': { 'href': 'https://devapi.hermo.my/v1/brand/969' } } }, 'merchant': { 'id': 1, 'name': 'Hermo', 'country': { 'id': 'MY', 'name': 'Malaysia' }, 'shipping': { 'courier': { 'name': 'Motorex', 'code': 'Motorex', 'tracking_url': 'http://www.motorex.com.my/tracking.php' }, 'estimate_arrival': '1-3 working days', 'currency': { 'id': 'MYR', 'code': 'MYR', 'symbol': 'RM' }, 'value': 'RM6.80(WM) / RM12.00(EM)', 'default_fee_wm': '6.80', 'default_fee_em': '12.00', 'free_shipping_cfg': { 'min_amount_wm': '50.00', 'min_amount_em': '150.00', 'min_qty_wm': 0, 'min_qty_em': 0 }, 'duration_normal': '1-3', 'duration_longer': '3-5' }, 'logo': { 'id': 4248, 'code': null, 'name': 'Hermo Logo', 'title': '', 'brief': 'Free Shipping above RM50(WM)/RM150(EM)', 'content': '', 'image': { 'desktop': null, 'mobile': null, 'tablet': null, 'app': null }, 'visibility': { 'desktop': true, 'mobile': true, 'tablet': true, 'app': true }, 'property': { 'image': { 'desktop': null, 'mobile': null, 'tablet': null, 'app': null } }, 'cta': { 'title': '', 'description': '', 'button_text': '', 'color': 'dark', 'alignment': 'center', 'action': { 'text': '', '_weblink': null, '_applink': { 'target': 'new-page', 'type': 'view', 'id': 'on-sale', 'page': { 'id': 'event-list', 'params': [{ 'key': 'url', 'value': 'https://devapi.hermo.my/v1/on-sale' }] } }, '_click': { 'type': 'Imagelink', 'key': '4248' } } }, 'timer': null, 'counter': null, 'url': '', '_weblink': null, '_applink': { 'target': 'new-page', 'type': 'view', 'id': 'on-sale', 'page': { 'id': 'event-list', 'params': [{ 'key': 'url', 'value': 'https://devapi.hermo.my/v1/on-sale' }] } }, '_click': { 'type': 'Imagelink', 'key': '4248' } }, 'banner': [], 'tax': { 'rate': '0.0000', 'is_taxable': 0 } }, 'url': '/mall/43208-nu-formula-mineral-cleansing-water-510ml', 'image': { 'small': 'https://devshop.hermo.my/product_images/malls/43208_nu-formula-mineral-cleansing-water-510ml_185_210_1565851101.png', 'medium': 'https://devshop.hermo.my/product_images/malls/43208_nu-formula-mineral-cleansing-water-510ml_200_125_1565851101.png', 'large': 'https://devshop.hermo.my/product_images/malls/43208_nu-formula-mineral-cleansing-water-510ml_440_280_1565851101.png', 'hotdeal': 'https://devshop.hermo.my/images/mall/hotdeal-image-not-found.jpg' }, 'currency': { 'id': 'MYR', 'code': 'MYR', 'symbol': 'RM' }, 'price': { 'retail': 109, 'normal': 109, 'selling': 76.3, 'saving': 32.7, 'discount_text': '30%', 'inclusive_tax': true }, 'tax': { 'price': 76.3, 'gst': { 'taxable': 76.3, 'rate': 0, 'text': '0% GST', 'value': 0 } }, 'instock': true, 'on_sale': true, 'deal': { 'type': 'default', 'expired_time': 1580486399, 'total_bought': 0, 'remaining_qty': 9999, 'image': { 'background': null }, 'attribute': { 'is_show_timer': false } }, 'status_bar': { 'is_active': false, 'move_image': null, 'bg_image': null, 'result': null, 'attribute': { 'is_show_status_bar': false } }, 'attribute': { 'is_selectable': false, 'is_notifiable': true, 'is_wishlistable': true, 'is_coming_soon': false }, 'estimate_arrival': '1-3 working days', 'review': { 'rating': 0, 'count': 0 }, 'features': [{ 'type': 'image', 'value': 'https://devshop.hermo.my/images/tags/hotdeal-200.png' }], 'extra_features': [], '_user': { 'notified': false, 'wishlisted': false }, '_google': { 'analytic': { 'ecommerce': { 'product': { 'id': '43208', 'name': 'Nu Formula Mineral Cleansing Water 510ml', 'price': '76.30', 'brand': 'Nu Formula', 'category': 'Make Up Removers' } } } }, '_applink': { 'target': 'new-page', 'type': 'mall', 'id': 43208, 'page': { 'id': 'mall-view', 'params': [{ 'key': 'url', 'value': 'https://devapi.hermo.my/v1/mall/43208' }] } }, '_weblink': null, '_links': { 'self': { 'href': 'https://devapi.hermo.my/v1/mall/43208' } } }],
//     email: 'ac@g.com',
//     sms_prefix: '+6011',
//     sms_number: '12345678',
//     otp: '',
//     receiver_name: 'Lim Tien Ping',
//     line_1: '2606',
//     city: 'Johor Bahru',
//     postal_code: '81100',
//     state_code: 'MY-01',
// };
const PROMOTION_ID = 8722;
const CURRENCY = 'RM';
const initialState = {
    cart: [],
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
            // ...mockData,
            ...initialState,
            pageIndex: 0,
            total: 0,
            openProduct: true,  // [TEST] => PRODUCT DETAILS TEST
            // openProduct: false,
            openSummary: false,
            openSnackBar: false,
            subtotal: 0,
            activeStep: 0,
            qty: 1,
            // formId: dataChecking(this.props, 'match', 'params', 'id'),
        };
    }

    componentDidMount = () => {
        Events.trigger('hideHeader', {});
        Events.trigger('hideFooter', {});
        this.props.dispatch(actions.getProductList({ url: `/mall/list?promotion_id=${PROMOTION_ID}` }));
        this.props.dispatch(actions.getConfig());

        this.props.dispatch(actions.getProduct({ id: 45710 })); // [TEST] => PRODUCT DETAILS TEST
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
        this.setState((state) => ({ cart: [...state.cart, item], openSnackBar: true }));
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

    renderHeader = () => {
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
                    return !(this.state.cart.length > 0);
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
            <AppBar className={this.props.classes.header} position="fixed" color="default">
                <Toolbar className={this.props.classes.headerBar}>
                    <Hidden smDown={true}>
                        <Container className={this.props.classes.headerBar}>
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
                    </Hidden>
                    <Hidden mdUp={true}>
                        {
                            this.state.openProduct ?
                                <IconButton onClick={() => this.setState({ openProduct: false })}>
                                    <KeyboardArrowLeft />
                                </IconButton>
                                :
                                <Link href="https://www.hermo.my">
                                    <img src={require('images/hermo-logo.png')} alt="Hermo Logo" width="100%" height="100%" />
                                </Link>
                        }
                        <IconButton>
                            <Badge
                                color="secondary"
                                badgeContent={this.state.cart.length}
                                invisible={this.state.cart.length === 0}
                            >
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }

    renderFooter = () => {
        const onClickNext = () => {
            this.setState((state) => ({ pageIndex: state.pageIndex + 1 }));
        };
        const disableNext = () => {
            const { receiver_name, line_1, city, postal_code, state_code } = this.state;
            switch (dataDig(formSetting[this.state.pageIndex], 'type')) {
                case 'product':
                    return !(this.state.cart.length > 0);
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
            <AppBar className={this.props.classes.footer} position="fixed" color="default">
                <Toolbar className={this.props.classes.footerBar} >
                    <Box>
                        <Typography variant="subtitle1" display="inline">Total</Typography>
                        <Typography variant="body1" display="inline" style={{ paddingLeft: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }} component="div">
                            {CURRENCY} {Number(this.state.total).toFixed(2)}
                        </Typography>
                        <Tooltip title="Summary" aria-label="summary">
                            <IconButton onClick={() => this.setState((state) => ({ openSummary: !state.openSummary }))}>
                                {
                                    this.state.openSummary ?
                                        <ExpandMore />
                                        :
                                        <ExpandLess />
                                }
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Button className={this.props.classes.nextButton} variant="contained" color="primary" disabled={disableNext()} aria-label="Next" onClick={onClickNext}>
                        Next
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }

    renderProductList = (data) => {
        if (this.state.openProduct) {
            const product = dataDig(this.props.formsPage, 'product');
            const changeQty = (type) => {
                switch (type) {
                    case '-':
                        this.setState((state) => ({ qty: state.qty - 1 }));
                        break;
                    case '+':
                        this.setState((state) => ({ qty: state.qty + 1 }));
                        break;
                    default:
                        break;
                }
            };
            const content = () => {
                if (dataDig(product, 'data')) {
                    return (
                        <ProductDetails
                            product={product.data}
                            addToCart={() => this.handleAddToCart(product.data)}
                            qty={this.state.qty}
                            handleChangeNumber={this.handleChangeNumber}
                            changeQty={changeQty}
                        />
                    );
                }
                if (dataDig(product, 'error')) {
                    return <Box>Product not found</Box>;
                }
                return <Box className={this.props.classes.productLoading}><CircularProgress /></Box>;
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

    renderConfirmOrder = () => {
        const { cart } = this.state;
        const info = (title, detail) => (
            <Box component="span">
                <Typography>{title} : {detail}</Typography>
            </Box>
        );
        return (
            <Box>
                <Cart items={cart} />
                <Paper className="mt-1">
                    {info('Receiver name', this.state.receiver_name)}
                    {info('Address', this.state.line_1)}
                    {info('Postcode', this.state.postal_code)}
                    {info('City', this.state.city)}
                    {info('State', this.state.state_code)}
                </Paper>
            </Box>
        );
    }
    renderPayment= () => (
        <Box>
            this is payment
        </Box>
    )

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

    renderSummary = () => (
        <Box className="py-1">
            <Box className={this.props.classes.summaryHeader}>
                <IconButton onClick={() => this.setState({ openSummary: false })}>
                    <Close />
                </IconButton>
                <Typography variant="h5" display="inline">Summary</Typography>
            </Box>
            <Divider />
            <Box className="py-2 px-2">
                <Box className={this.props.classes.summaryContent}>
                    <Typography variant="h6" display="inline">
                        Subtotal:
                    </Typography>
                    <Typography variant="body1" color="textSecondary" display="inline" style={{ fontSize: '1.4rem' }}>
                        {CURRENCY} {Number(this.state.subtotal).toFixed(2)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )


    render = () => (
        <Box className="fast-checkout-page">
            {/* <Box className="ppf-version">
                {globalScope.formVersion}
            </Box> */}
            {this.renderHeader()}
            <Box className={this.props.classes.content}>
                {this.renderFormPage()}
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
                autoHideDuration={3000}
                message={<Typography>Item added into cart</Typography>}
                onClose={() => this.setState({ openSnackBar: false })}
            />
            {this.renderFooter()}
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
