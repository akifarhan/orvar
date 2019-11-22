/**
 *
 * ProductInfo
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
    Divider,
    Grid,
    Typography,
} from '@material-ui/core';
import HtmlParser from 'components/HtmlParser';
import ViewMoreText from 'components/ViewMoreText';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking, Events } from 'globalUtils';
import makeSelectProductInfo from './selectors';
import { getProduct } from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProductInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount = () => {
        const productId = dataChecking(this.props, 'match', 'params', 'productId');
        if (productId) {
            const id = productId.split('-', 2)[0];
            this.props.dispatch(getProduct(id));
        }
    }
    componentDidMount = () => {
        Events.trigger('hideHeader', {});
        Events.trigger('hideFooter', {});
    }


    renderInfo = (title, value) => (
        <Grid container={true}>
            <Grid item={true} lg={6} md={6} xs={4}>
                <Typography color="textSecondary" style={{ lineHeight: 2 }}>{title}</Typography>
            </Grid>
            <Grid item={true} lg={6} md={6} xs={8} align="left">
                <ViewMoreText
                    text={value}
                    readMoreCharacterLimit={150}
                    showLessButton={true}
                />
            </Grid>
        </Grid>
    )
    renderSpec = (specsList) => (
        specsList.map((spec, index) => (
            <div key={index}>
                {dataChecking(spec, 'value') && this.renderInfo(spec.title, spec.value)}
            </div>
        ))
    )
    render() {
        const product = dataChecking(this.props, 'productInfo', 'product', 'data');

        return (
            <div>
                {
                    this.props.productInfo.product.loading ?
                        <div>
                            <CircularProgress
                                className="product-description-loader"
                                style={{
                                    display: 'block',
                                    margin: 'auto',
                                    padding: '4rem',
                                }}
                            />
                        </div>
                        :
                        dataChecking(product) &&
                            <Container>
                                <div className="product-specification py-half">
                                    {
                                        dataChecking(product, 'subcategory') && this.renderInfo('Category', dataChecking(product, 'subcategory', 'name'))

                                    }
                                    {
                                        dataChecking(product, 'specification') && this.renderSpec(dataChecking(product, 'specification'))
                                    }
                                </div>
                                <Divider />
                                <div className="product-photos">
                                    {
                                        dataChecking(product, 'photos') && <HtmlParser html={dataChecking(product, 'photos')} />
                                    }
                                </div>
                                <div className="product-usage">
                                    {
                                        dataChecking(product, 'usage') && <HtmlParser html={dataChecking(product, 'usage')} />
                                    }
                                </div>
                                <div className="product-disclaimer">
                                    {
                                        dataChecking(product, 'disclaimer') && <HtmlParser html={dataChecking(product, 'disclaimer')} />
                                    }
                                </div>
                            </Container>
                }
            </div>
        );
    }
}

ProductInfo.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    productInfo: makeSelectProductInfo(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'productInfo', reducer });
const withSaga = injectSaga({ key: 'productInfo', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProductInfo);
