/**
 *
 * ProductDescription
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
    CircularProgress,
    Container,
} from '@material-ui/core';
import HtmlParser from 'components/HtmlParser';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking, Events } from 'globalUtils';
import makeSelectProductDescription from './selectors';
import { getProduct } from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
export class ProductDescription extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount = () => {
        if (dataChecking(this.props, 'product')) {
            return null;
        }
        const productId = dataChecking(this.props, 'match', 'params', 'productId');
        if (productId) {
            const id = productId.split('-', 2)[0];
            this.props.dispatch(getProduct(id));
        }
        return null;
    }
    componentDidMount = () => {
        if (dataChecking(this.props, 'product')) {
            return null;
        }
        Events.trigger('hideHeader', {});
        Events.trigger('hideFooter', {});
        return null;
    }

    render() {
        const product = dataChecking(this.props, 'productDescription', 'product', 'data') || dataChecking(this.props, 'product');
        if (dataChecking(this.props.productDescription, 'product, loading')) {
            return (
                <div className="product-description-loader">
                    <CircularProgress className="loader" />
                </div>
            );
        }
        return (
            <div className="product-description">
                {
                    <Container>
                        {
                            dataChecking(product, 'description') && <HtmlParser html={dataChecking(product, 'description')} />
                        }
                        {
                            dataChecking(product, 'disclaimer') && <HtmlParser html={dataChecking(product, 'disclaimer')} />
                        }
                    </Container>
                }
            </div>
        );
    }
}

ProductDescription.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    productDescription: makeSelectProductDescription(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'productDescription', reducer });
const withSaga = injectSaga({ key: 'productDescription', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProductDescription);
