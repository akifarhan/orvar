/**
 *
 * NotifyMe
 *
 */

import React from 'react';
import { dataChecking } from 'globalUtils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
    CircularProgress,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
} from '@material-ui/core';
import { notifySuccess } from 'containers/Notify';
import ErrorMessage from 'components/ErrorMessage';
import PopupDialog from 'components/PopupDialog';
import InputForm from 'components/InputForm';
import ProductCard from 'components/ProductCard';
import makeSelectNotifyMe from './selectors';
import makeSelectHeader from '../Header/selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class NotifyMe extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            id: '',
            method: '',
            sms_number: '',
            sms_prefix: '+6010',
            responseError: false,
        };
    }

    componentDidMount = () => {
        this.props.dispatch(actions.getProductData({ productId: this.props.productID }));
        this.props.dispatch(actions.getConfigData());
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps.notifyMe.loading !== this.props.notifyMe.loading && nextProps.notifyMe.loading) {
            this.setState({ dialogType: 'loading' });
        }
        if (this.props.notifyMe.restock.success !== nextProps.notifyMe.restock.success && nextProps.notifyMe.restock.success) {
            const data = dataChecking(nextProps, 'notifyMe', 'restock', 'data');
            this.setState({
                dialogType: 'notify_me',
                email: data.email,
                sms_number: data.sms_number,
                sms_prefix: data.sms_prefix,
                id: data.product.id,
            });
        }
        if (this.props.notifyMe.notify.success !== nextProps.notifyMe.notify.success && nextProps.notifyMe.notify.success) {
            if (dataChecking(nextProps, 'notifyMe', 'notify', 'data')) {
                notifySuccess(nextProps.notifyMe.notify.data.messages[0].text);
                this.props.onClose();
            }
        }
        if (nextProps.notifyMe.notify.error !== this.props.notifyMe.notify.error && nextProps.notifyMe.notify.error) {
            this.setState({ responseError: true });
        }
    }

    onClear = (event) => {
        this.setState({ [event.target.id]: '' });
    }
    onSubmit = () => {
        const notifyData = {
            email: this.state.email,
            id: this.props.productID,
            method: this.state.method,
            sms_number: this.state.sms_number,
            sms_prefix: this.state.sms_prefix,
        };
        if (this.checkComplete()) {
            this.props.dispatch(actions.postNotify(notifyData));
        }
    }

    checkComplete = () => {
        switch (this.state.method) {
            case 'sms':
                if (this.state.sms_number !== '') {
                    return true;
                }
                break;
            case 'email':
                if (this.state.email !== '') {
                    return true;
                }
                break;
            default:
                if (this.state.email !== '' && this.state.method !== '' && this.state.sms_number !== '') {
                    return true;
                }
                break;
        }
        return false;
    }
    methodOptions = () => dataChecking(this.props.notifyMe, 'restock', 'data', 'method_options', 'items', 'length') &&
        this.props.notifyMe.restock.data.method_options.items.map((item, index) => (
            <MenuItem key={index} value={item.id}>
                {item.name}
            </MenuItem>
        ))
    smsPrefixList = () => dataChecking(this.props.notifyMe, 'config', 'data', 'mobile_prefix', 'items', 'length') &&
        this.props.notifyMe.config.data.mobile_prefix.items.map((item, index) => (
            <option key={index} value={item.value}>
                {item.name}
            </option>
        ))

    renderDialogContent = () => {
        const product = dataChecking(this.props.notifyMe, 'restock', 'data', 'product');

        switch (this.state.dialogType) {
            case 'loading':
                return (
                    <div className="notify-me-loading p-3"><CircularProgress /></div>
                );
            case 'notify_me':
                return (
                    <div className="notify-me-content">
                        <form>
                            <Grid container={true} spacing={1} justify="center" alignItems="center">
                                <Grid item={true} xs={12} sm={4}>
                                    <img
                                        src={dataChecking(product, 'image', 'small')}
                                        alt="product_image"
                                        className="notify-me-image"
                                    />
                                </Grid>
                                <Grid item={true} xs={12} sm={8}>
                                    <ProductCard
                                        product={product}
                                        url={dataChecking(product, 'url')}
                                        disableElevation={true}
                                        rating={true}
                                    />
                                </Grid>
                            </Grid>
                            <InputLabel className="text-capitalize py-half">Notification method *</InputLabel>
                            <FormControl variant="outlined" fullWidth={true} required={true}>
                                <Select
                                    value={this.state.method}
                                    onChange={(event) => this.setState({ method: event.target.value, submitError: false })}
                                    input={
                                        <OutlinedInput name="method" />
                                    }
                                    required={true}
                                >
                                    {this.methodOptions()}
                                </Select>
                            </FormControl>
                            <InputLabel className="text-capitalize py-half">Phone no *</InputLabel>
                            <Grid container={true} direction="row" justify="space-around" align="stretch">
                                <Grid item={true} xs={3} md={2}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <Select
                                            native={true}
                                            id="sms_prefix"
                                            value={this.state.sms_prefix}
                                            onChange={(event) => this.setState({ sms_prefix: event.target.value })}
                                            input={
                                                <OutlinedInput />
                                            }
                                        >
                                            {this.smsPrefixList()}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={9} md={10}>
                                    <FormControl fullWidth={true}>
                                        <InputForm
                                            id="sms_number"
                                            handleChange={(event) => {
                                                const onlyNums = event.target.value.replace(/[^0-9]/g, '');
                                                if (onlyNums.length < 15) {
                                                    this.setState({ sms_number: onlyNums });
                                                }
                                            }}
                                            value={this.state.sms_number}
                                            placeholder="e.g. 7654321"
                                            onClear={this.onClear}
                                            required={true}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <FormControl fullWidth={true}>
                                <InputForm
                                    label="Email address"
                                    id="email"
                                    type="email"
                                    handleChange={(event) => this.setState({ email: event.target.value })}
                                    value={this.state.email}
                                    onClear={this.onClear}
                                />
                            </FormControl>
                            {this.state.responseError && <ErrorMessage error={this.props.notifyMe.notify.error} />}
                        </form>
                    </div>
                );
            default:
                break;
        }
        return null;
    }
    render() {
        return (
            <PopupDialog
                display={this.props.notifyMePopup}
                onClose={this.props.onClose}
                onSubmit={this.state.dialogType === 'notify_me' ? this.onSubmit : null}
                onCancel={this.state.dialogType === 'notify_me' ? this.props.onClose : null}
                isComplete={this.checkComplete()}
            >
                {this.renderDialogContent()}
            </PopupDialog>
        );
    }
}

NotifyMe.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    notifyMe: makeSelectNotifyMe(),
    header: makeSelectHeader(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'notifyMe', reducer });
const withSaga = injectSaga({ key: 'notifyMe', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(NotifyMe);
