/**
 *
 * FormsPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
    Box,
    Button,
    FormControl,
    // FormControlLabel,
    FormGroup,
    FormLabel,
    InputLabel,
    OutlinedInput,
    Select,
} from '@material-ui/core';

import { dataDig, dataChecking, Events, setCookie } from 'globalUtils';
import globalScope from 'globalScope';

import InputForm from 'components/InputForm';
import AddressForm from 'components/AddressForm';
import { notifyError } from 'containers/Notify';

import * as actions from './actions';
import makeSelectFormsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const formSetting = {
    product: {
        title: 'Select Product',
        type: 'timetable',
        onNext: (scope) => {
            scope.setState({ selectedPage: 'delivery', readyTonNext: false });
            // scope.props.dispatch(actions.getCheckoutData());
        },
    },
    delivery: {
        title: 'Delivery Info',
        type: 'deliveryInfo',
        onNext: (scope) => {
            // set loading
            scope.handleDeliveryInfo();
            // login
            // add default address
        },
        onPrev: (scope) => {
            if (dataDig(scope, 'state.selectedProduct')) {
                scope.setState({ readyTonNext: true });
            }
            scope.setState({ selectedPage: 'product' });
        },
    },
    payment: {
        title: 'Select Payment',
        type: 'payment',
        onNext: () => {
            // set courier
            // set payment
            // proceed with checkout
        },
    },
};

const mockData = {
    selected_product: 45980,
    email: 'ac@g.com',
    sms_prefix: '+6011',
    sms_number: '12345678',
    otp: '',
    receiver_name: 'Lim Tien Ping',
    line_1: '2606',
    line_2: 'Sky Oasis',
    line_3: 'Jalan Setia Indah',
    city: 'Johor Bahru',
    postal_code: '81100',
    state_code: 'MY-01',
};

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

const selectOneOnly = true;

export class FormsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            // ...initialState,
            ...mockData,
            isComplete: false,
            selectedPage: Object.keys(formSetting)[0],
            selectedProduct: {},
            formId: dataChecking(this.props, 'match', 'params', 'id'),
        };
    }

    componentDidMount = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        Events.trigger('hideHeader', {});
        Events.trigger('hideFooter', {});

        // setTimeout(() => {
        //     this.setState({ isRendered: true });
        // }, 1100);
        // if (window.takePocket) {
        //     this.handlePocket(window.takePocket());
        // } else if (this.props.location.search.indexOf('pickPocket') !== -1) {
        //     if (window.addEventListener) {
        //         // For standards-compliant web browsers
        //         window.addEventListener('message', this.parsePocketFromWeb, false);
        //     } else {
        //         window.attachEvent('onmessage', this.parsePocketFromWeb);
        //     }
        // } else if (!globalScope.token) {
        //     globalScope.previousPage = window.location.pathname;
        //     this.setState({ requestToken: true, loading: false });
        // } else {
        //     this.setState({ requestToken: false, loading: false });
        // }

        this.props.dispatch(actions.getTimeTable({ id: 8328 }));
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

        if (nextProps.formsPage.signup.data !== this.props.formsPage.signup.data && nextProps.formsPage.signup.success) {
            if (globalScope.token) {
                const { receiver_name, line_1, line_2, line_3, city, postal_code, state_code, sms_number, sms_prefix } = this.state;
                this.props.dispatch(actions.addAddress({ receiver_name, line_1, line_2, line_3, city, postal_code, state_code, sms_number, sms_prefix }));
            } else {
                notifyError('Signup failed');
            }
        }

        if (nextProps.formsPage.addAddress.data !== this.props.formsPage.addAddress.data && nextProps.formsPage.addAddress.success) {
            const item = Object.keys(this.state.selectedProduct);
            this.props.dispatch(actions.addToCart({ id: item[0] }));
        }
        if (nextProps.formsPage.addToCart.data !== this.props.formsPage.addToCart.data && nextProps.formsPage.addToCart.success) {
            this.setState({ selectedPage: 'payment' });
        }
    }

    onSelectTimeTableItem = (item) => {
        const selectedProduct = selectOneOnly ? { [item.id]: this.state.selectedProduct[item.id] } : { ...this.state.selectedProduct };
        selectedProduct[item.id] = !selectedProduct[item.id];
        this.setState({
            selectedProduct,
            readyTonNext: selectedProduct[item.id],
        });
    }

    onClear = (event) => {
        this.setState({ [event.target.id]: '' });
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

    handlePocket = (pocket) => {
        if (pocket.hertoken) {
            globalScope.profile = pocket;
            globalScope.token = pocket.hertoken;
            globalScope.axios.setHeader('hertoken', globalScope.token);
            setCookie(process.env.TOKEN_KEY, globalScope.token);
            this.setState({ loading: false });
        } else if (globalScope.token) {
            this.setState({ loading: false, requestToken: false });
        } else {
            globalScope.previousPage = window.location.pathname;
            this.setState({ requestToken: true, loading: false });
        }
    }


    handleChange = (event, MAX) => {
        if (event.target.id === 'otp') {
            this.setState({ readyTonNext: !!event.target.value });
        }
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

    handleSendOTP = () => {
        const { sms_number, sms_prefix } = this.state;
        if (sms_number && sms_prefix) {
            this.props.dispatch(actions.sendOTP({ sms_prefix, sms_number }));
            this.setState({ sendClick: true });
        }
    }

    handleDeliveryInfo = () => {
        // const { email, otp, sms_number, sms_prefix } = this.state;

        if (this.state.readyTonNext) {
            // const password = `${email.substr(0, 4).toUpperCase()}${otp}`;
            // console.log(password);
            const { receiver_name, line_1, line_2, line_3, city, postal_code, state_code, sms_number, sms_prefix } = this.state;
            this.props.dispatch(actions.addAddress({ receiver_name, line_1, line_2, line_3, city, postal_code, state_code, sms_number, sms_prefix }));
            // this.props.dispatch(actions.signupUser({ sms_prefix, sms_number, email, tac: otp, password, password_confirmation: password }));
        }/* else {
            if (sms_number === '') {
                notifyError('Please key in SMS number');
            }
            if (email === '') {
                notifyError('Please key in Email Address');
            }
            if (otp === '') {
                notifyError('Please key in OTP Number');
            }
            if (receiver_name === '') {
                notifyError('Please key in Receiver name');
            }
            if (line_1 === '') {
                notifyError('Please key in Address');
            }
            if (city === '') {
                notifyError('Please key in City');
            }
            if (postal_code === '') {
                notifyError('Please key in Postcode');
            }
        } */
    }

    checkComplete = () => {
        const { email, otp, sms_number, receiver_name, line_1, city, postal_code } = this.state;
        if (sms_number !== '' && email !== '' && otp !== '' && receiver_name !== '' && line_1 !== '' && city !== '' && postal_code !== '') {
            return true;
        }
        return false;
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
    statesList = () => {
        if (!dataDig(this.props.formsPage, 'config.data.state.items.length')) {
            return null;
        }

        return this.props.formsPage.config.data.state.items.map((item, index) => (
            <option key={index} value={item.value}>
                {item.name}
            </option>
        ));
    }

    renderTimeTable = () => {
        if (dataDig(this.props.formsPage.timeTable, 'success')) {
            const items = dataDig(this.props.formsPage.timeTable, 'data.product.result.items');
            return (
                <Box className={`timetable-items ${items.length > 12 ? 'full-height-and-overflow' : ''}`}>
                    {
                        items.map((item) => (
                            <Box
                                key={item.id}
                                className={`timetable-item ${this.state.selectedProduct[item.id] ? 'selected' : ''}`}
                                onClick={() => this.onSelectTimeTableItem(item)}
                            >
                                <Box className="timetable-item-image">
                                    <img src={item.image.medium || ''} alt="" />
                                </Box>
                                <Box className="timetable-item-name">
                                    {item.name}
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            );
        }

        return <Box>Loading</Box>;
    }

    renderDeliveryInfo = () => (
        <Box className="form-field-items py-2">
            <FormControl fullWidth={true}>
                <InputForm
                    label="Email address"
                    id="email"
                    className="email-field form-field-item"
                    type="email"
                    handleChange={this.handleChange}
                    value={this.state.email}
                    onClear={this.onClear}
                />
            </FormControl>
            <Box className="phone-number-field form-field-item my-half">
                <InputLabel className="text-capitalize pb-half bigger">Mobile number *</InputLabel>
                <Box
                    className="phone-number-input form-field-item"
                >
                    <FormControl className="pr-1">
                        <Select
                            native={true}
                            id="sms_prefix"
                            className=""
                            value={this.state.sms_prefix}
                            onChange={this.handleChange}
                            input={
                                <OutlinedInput />
                            }
                            required={true}
                        >
                            {this.smsPrefixList()}
                        </Select>
                    </FormControl>
                    <FormControl className="pr-1">
                        <InputForm
                            id="sms_number"
                            handleChange={this.handleChangeNumber}
                            value={this.state.sms_number}
                            placeholder="e.g. 7654321"
                            onClear={this.onClear}
                            onClick={this.handleSendOTP}
                            requestOTP={true}
                            canResend={this.state.canResend}
                            otpSent={this.state.otpSent}
                            timer={this.state.timer}
                        />
                    </FormControl>
                </Box>
            </Box>

            <FormControl fullWidth={true}>
                <FormLabel className="pb-half">OTP Number *</FormLabel>
                <InputForm
                    id="otp"
                    className="otp-field form-field-item"
                    handleChange={this.handleChange}
                    value={this.state.otp}
                    onClear={this.onClear}
                />
            </FormControl>

            <FormLabel className="pt-2 pb-half mb-quater">Shipping Address</FormLabel>
            <FormGroup className="shipping-address-group">
                <AddressForm
                    handleChange={this.handleChange}
                    onClear={this.onClear}
                    state={this.state}
                    statesList={this.statesList()}
                    handleChangePostCode={(event) => this.handleChangeNumber(event, 6)}
                    handleChangeCity={(event) => this.handleChange(event, 51)}
                    hideExtra={true}
                />
            </FormGroup>
        </Box>
    )

    renderPayment = () => (
        <Box>
            This is payment page
        </Box>
    )
    //     key: 'courier',
    //     label: 'Delivery Courier',

    renderActionButtons = () => (
        <Box className="action-button-container">
            {
                [{
                    actionName: 'onPrev',
                    text: 'Previous',
                    activeCheck: (action) => !!formSetting[this.state.selectedPage][action.actionName],
                }, {
                    actionName: 'onNext',
                    text: 'Next',
                    activeCheck: (action) => !!this.state.readyTonNext && formSetting[this.state.selectedPage][action.actionName],
                }].map((action, index) => (
                    <Button
                        key={index}
                        className={`action-button ${action.activeCheck(action) ? 'active' : ''}`}
                        onClick={() => {
                            if (!action.activeCheck(action)) {
                                return;
                            }
                            if (formSetting[this.state.selectedPage][action.actionName]) {
                                formSetting[this.state.selectedPage][action.actionName](this);
                            }
                        }}
                    >
                        {action.text}
                    </Button>
                ))
            }
        </Box>
    );

    renderFormPage = (page) => {
        switch (page.type) {
            case 'timetable': return this.renderTimeTable();
            case 'deliveryInfo': return this.renderDeliveryInfo(page);
            case 'payment': return this.renderPayment();
            default: return <Box>Unknown page type</Box>;
        }
    }

    render = () => (
        <Box className="mobile-style-page" style={{ fontSize: this.state.pageFontSize }}>
            <Box className="mobile-style-container">
                <Box
                    className="ppf-version"
                    onClick={() => {
                        // alert(`${window.parent ? 'have window.parent' : 'no window.parent'}`);
                        // // alert(`${window.parent && window.parent.onPerfectGame ? 'have window.parent.onPerfectGame' : 'no window.parent.onPerfectGame'}`);
                        // if (window.parent && window.parent.onPerfectGame) {
                        //     window.parent.onPerfectGame();
                        // }

                        // if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                        //     window.ReactNativeWebView.postMessage('adasdadasd', 'applink');

                        //     if (window.onCloseWindow) {
                        //         window.onCloseWindow();
                        //     }
                        // }
                    }}
                >
                    {globalScope.formVersion}
                </Box>
                <img
                    src="https://s3.ap-southeast-1.amazonaws.com/files.hermo.my/public/gamiassets/450295343_background.png"
                    alt="main menu background"
                    className="mobile-style-main-bg animated fadeIn"
                />
                <Box className="form-page-content">
                    {this.renderFormPage(formSetting[this.state.selectedPage])}
                </Box>
                {this.renderActionButtons()}
            </Box>
        </Box>
    );
}

FormsPage.propTypes = {
    // dispatch: PropTypes.func.isRequired,
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
    withConnect,
)(FormsPage);
