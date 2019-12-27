/**
 *
 * FormsPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
    Button,
    FormControl,
    InputLabel,
    Select,
    FormLabel,
    FormGroup,
    // FormControlLabel,
    OutlinedInput,
} from '@material-ui/core';

import { dataDig, dataChecking, Events, setCookie } from 'globalUtils';
import globalScope from 'globalScope';

import InputForm from 'components/InputForm';
import { notifyError } from 'containers/Notify';

import * as actions from './actions';
import makeSelectFormsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
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
            scope.handleSignUp();
            // login
            // add default address
        },
        onPrev: (scope) => {
            scope.setState({ selectedPage: 'product' });
        },
    },
    payment: {
        title: 'Select Product',
        type: 'timetable',
        onNext: () => {
            // set courier
            // set payment
            // proceed with checkout
        },
    },
};

const mockData = {
    selected_product: 45980,

    email: 'petwesley@gmail.com',
    sms_prefix: '+6016',
    sms_number: '8556201',

    receiver_name: 'Lim Tien Ping',
    line_1: '2606',
    line_2: 'Sky Oasis',
    line_3: 'Jalan Setia Indah',
    city: 'Johor Bahru',
    postal_code: '81100',
    state_code: 'MY-01',
};

const selectOneOnly = true;

export class FormsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            ...mockData,
            selectedPage: Object.keys(formSetting)[1],
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
        this.props.dispatch(actions.getPhonePrefix());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.formsPage.otp !== this.props.formsPage.otp && nextProps.formsPage.otp.success) {
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
                this.setState({ selectedPage: 'payment' });
            } else {
                notifyError('Signup failed');
            }
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


    handleChange = (event, key) => {
        if (key === 'otp') {
            this.setState({ readyTonNext: !!event.target.value });
        }

        this.setState({ [key]: event.target.value });
    };

    handleChangeNumber = (event) => {
        const onlyNums = event.target.value.replace(/[^0-9]/g, '');
        if (onlyNums.length < 15) {
            this.setState({ sms_number: onlyNums });
        }
    }

    handleSendOTP = () => {
        const { sms_number, sms_prefix } = this.state;
        if (sms_number && sms_prefix) {
            this.props.dispatch(actions.sendOTP({ sms_prefix, sms_number }));
            this.setState({ sendClick: true });
        }
    }

    handleSignUp = () => {
        const { email, otp, sms_number, sms_prefix } = this.state;
        if (sms_number) {
            notifyError('Please key in SMS number');
        } else if (sms_prefix) {
            notifyError('Please key in SMS Prefix');
        } else if (email) {
            notifyError('Please key in Email Address');
        } else if (otp) {
            notifyError('Please key in OTP Number');
        }

        const password = `${email.substr(0, 4).toUpperCase()}${otp}`;
        console.log(password);
        this.props.dispatch(actions.sendOTP({ sms_prefix, sms_number, email, tac: otp, password, confirmation_password: password }));
    }

    smsPrefixList = () => {
        if (!dataChecking(this.props.formsPage, 'phonePrefix', 'data', 'items', 'length')) {
            return null;
        }

        return this.props.formsPage.phonePrefix.data.items.map((item, index) => (
            <option key={index} value={item.value}>
                {item.name}
            </option>
        ));
    }

    renderTimeTable = () => {
        if (dataDig(this.props.formsPage.timeTable, 'success')) {
            const items = dataDig(this.props.formsPage.timeTable, 'data.product.result.items');
            return (
                <div className={`timetable-items ${items.length > 12 ? 'full-height-and-overflow' : ''}`}>
                    {
                        items.map((item) => (
                            <div
                                key={item.id}
                                className={`timetable-item ${this.state.selectedProduct[item.id] ? 'selected' : ''}`}
                                onClick={() => this.onSelectTimeTableItem(item)}
                            >
                                <div className="timetable-item-image">
                                    <img src={item.image.medium || ''} alt="" />
                                </div>
                                <div className="timetable-item-name">
                                    {item.name}
                                </div>
                            </div>
                        ))
                    }
                </div>
            );
        }

        return <div>Loading</div>;
    }

    renderDeliveryInfo = () => (
        <div className="form-field-items py-2">
            <FormControl fullWidth={true}>
                <FormLabel className="pt-2 pb-half">Email address</FormLabel>
                <InputForm
                    id="email"
                    className="email-field form-field-item"
                    type="email"
                    handleChange={(event) => { this.handleChange(event, 'email'); }}
                    value={this.state.email}
                    onClear={() => {
                        this.setState({ email: '' });
                    }}
                />
            </FormControl>
            <div className="phone-number-field form-field-item my-half">
                <InputLabel className="text-capitalize pb-half bigger">Mobile number</InputLabel>
                <div
                    className="phone-number-input form-field-item"
                >
                    <FormControl className="pr-1">
                        <Select
                            native={true}
                            id="sms_prefix"
                            className=""
                            value={this.state.sms_prefix}
                            onChange={(event) => { this.handleChange(event, 'sms_prefix'); }}
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
                            onClear={() => {
                                this.setState({ sms_number: '' });
                            }}
                            onClick={this.handleSendOTP}
                            requestOTP={true}
                            canResend={this.state.canResend}
                            otpSent={this.state.otpSent}
                            timer={this.state.timer}
                        />
                    </FormControl>
                </div>
            </div>

            <FormControl fullWidth={true}>
                <FormLabel className="pb-half">OTP Number</FormLabel>
                <InputForm
                    id="otp"
                    className="otp-field form-field-item"
                    handleChange={(event) => { this.handleChange(event, 'otp'); }}
                    value={this.state.otp}
                    onClear={() => {
                        this.setState({ otp: '' });
                    }}
                />
            </FormControl>

            <FormControl fullWidth={true}>
                <FormLabel className="pt-2 pb-half mb-quater">Shipping Address</FormLabel>
                <FormGroup className="shipping-address-group">
                    <FormControl fullWidth={true}>
                        <InputForm
                            label="Receiver Name"
                            id="receiver_name"
                            className="receiver_name-field form-field-item"
                            type="email"
                            handleChange={(event) => { this.handleChange(event, 'receiver_name'); }}
                            value={this.state.receiver_name}
                            onClear={() => {
                                this.setState({ receiver_name: '' });
                            }}
                            // placeholder="e.g. 7654321"
                        />
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <InputForm
                            label="Line 1"
                            id="line_1"
                            className="line_1-field form-field-item"
                            type="email"
                            handleChange={(event) => { this.handleChange(event, 'line_1'); }}
                            value={this.state.line_1}
                            onClear={() => {
                                this.setState({ line_1: '' });
                            }}
                            // placeholder="e.g. 7654321"
                        />
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <InputForm
                            label="Line 2"
                            id="line_2"
                            className="line_2-field form-field-item"
                            type="email"
                            handleChange={(event) => { this.handleChange(event, 'line_2'); }}
                            value={this.state.line_2}
                            onClear={() => {
                                this.setState({ line_2: '' });
                            }}
                            // placeholder="e.g. 7654321"
                        />
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <InputForm
                            label="Line 3"
                            id="line_3"
                            className="line_3-field form-field-item"
                            type="email"
                            handleChange={(event) => { this.handleChange(event, 'line_3'); }}
                            value={this.state.line_3}
                            onClear={() => {
                                this.setState({ line_3: '' });
                            }}
                            // placeholder="e.g. 7654321"
                        />
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <InputForm
                            label="City"
                            id="city"
                            className="city-field form-field-item"
                            type="email"
                            handleChange={(event) => { this.handleChange(event, 'city'); }}
                            value={this.state.city}
                            onClear={() => {
                                this.setState({ city: '' });
                            }}
                            // placeholder="e.g. 7654321"
                        />
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <InputForm
                            label="Postal Code"
                            id="postal_code"
                            className="postal_code-field form-field-item"
                            type="email"
                            handleChange={(event) => { this.handleChange(event, 'postal_code'); }}
                            value={this.state.postal_code}
                            onClear={() => {
                                this.setState({ postal_code: '' });
                            }}
                            // placeholder="e.g. 7654321"
                        />
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <InputForm
                            label="State Code"
                            id="state_code"
                            className="state_code-field form-field-item"
                            type="email"
                            handleChange={(event) => { this.handleChange(event, 'state_code'); }}
                            value={this.state.state_code}
                            onClear={() => {
                                this.setState({ state_code: '' });
                            }}
                            // placeholder="e.g. 7654321"
                        />
                    </FormControl>
                </FormGroup>
                {/* <FormHelperText>Be careful</FormHelperText> */}
            </FormControl>
        </div>
    )

    //     key: 'courier',
    //     label: 'Delivery Courier',

    renderActionButtons = () => (
        <div className="action-button-container">
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
        </div>
    );

    renderFormPage = (page) => {
        if (page.type === 'timetable') {
            return this.renderTimeTable();
        } else if (page.type === 'deliveryInfo') {
            return this.renderDeliveryInfo(page);
        }

        return <div>Unknown page type</div>;
    }

    render = () => (
        <div className="mobile-style-page" style={{ fontSize: this.state.pageFontSize }}>
            <div className="mobile-style-container">
                <div
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
                >{globalScope.fomrVersion}</div>
                <img
                    src="https://s3.ap-southeast-1.amazonaws.com/files.hermo.my/public/gamiassets/450295343_background.png"
                    alt="main menu background"
                    className="mobile-style-main-bg animated fadeIn"
                />
                <div className="form-page-content">
                    {this.renderFormPage(formSetting[this.state.selectedPage])}
                </div>
                {this.renderActionButtons()}
            </div>
        </div>
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
