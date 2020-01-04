/**
*
* ProductCard
*
*/
import React from 'react';
import { dataChecking } from 'globalUtils';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import
{
    Box,
    Button,
    ButtonBase,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core';
import
{
    AddShoppingCart,
    Cancel,
    KeyboardArrowRight,
    NotificationImportant,
    Star,
    StarBorder,
} from '@material-ui/icons';

import ViewMoreText from 'components/ViewMoreText';
import './style.scss';

class ProductCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    handleClickImage = () => {
        if (this.props.url) {
            return this.props.history.push(this.props.url);
        }
        if (this.props.onClickImage) {
            return this.props.onClickImage();
        }
        return null;
    }

    renderImage = () => (
        <div className="product-img text-xs-center mb-1">
            <img
                src={dataChecking(this.props.product, 'image', 'small')}
                alt="product_image"
                width="100%"
                height="100%"
            />
            {
                dataChecking(this.props.product, 'instock') ?
                    ''
                    :
                    <div className="out-of-stock">
                        <Typography variant="overline" className="oos-text">out of stock</Typography>
                    </div>
            }
        </div>
    )

    renderFeature = () => {
        const features = dataChecking(this.props.product, 'features');
        const discount = dataChecking(this.props.product, 'price', 'discount_text');

        return (
            <Grid container={true} justify="center" className="product-feature">
                {
                    features.length > 0 &&
                    features.map((feature, key) => (
                        <Grid item={true} key={`${this.props.product.id}-${key}`}>
                            <img
                                src={feature.value}
                                alt="product_feature"
                                className="feature-tag"
                                width="100%"
                                height="100%"
                            />
                        </Grid>
                    ))
                }
                {
                    discount !== null &&
                    <Grid item={true} className="discount-tag">
                        <Typography variant="caption">{discount}</Typography>
                    </Grid>
                }
            </Grid>
        );
    }

    renderPrice = () => {
        const retailPrice = dataChecking(this.props.product, 'price', 'retail');
        const sellingPrice = dataChecking(this.props.product, 'price', 'selling');
        const discountText = dataChecking(this.props.product, 'price', 'discount_text');
        const symbol = dataChecking(this.props.product, 'currency', 'symbol');

        if (!retailPrice && !sellingPrice && !discountText) {
            return null;
        }

        return (
            <div className="product-price">
                <Typography variant="h6" style={{ paddingRight: `${discountText === null ? 0 : '10px'}`, fontWeight: 'bold' }}>
                    {symbol}{sellingPrice.toFixed(2)}
                </Typography>
                {
                    discountText === null ?
                        ''
                        :
                        <Typography color="textSecondary" style={{ textDecoration: 'line-through' }}>
                            {symbol}{retailPrice.toFixed(2)}
                        </Typography>
                }
            </div>
        );
    }

    renderBrand = () => (
        <div className="product-brand pb-half">
            <ButtonBase
                onClick={() => {
                    if (this.props.disableBrandClick) {
                        return null;
                    }
                    return this.props.history.push(dataChecking(this.props.product, 'brand', 'url'));
                }}
            >
                <Typography
                    color="primary"
                    variant="button"
                    style={{ fontWeight: 'bold' }}
                >
                    {dataChecking(this.props.product, 'brand', 'name')}
                </Typography>
                <IconButton size="small" style={{ padding: '0 0 2px 3px' }}>
                    <KeyboardArrowRight color="primary" />
                </IconButton>
            </ButtonBase>
        </div>
    )

    renderDescription = () => (
        <div className="product-description">
            <ViewMoreText
                text={this.props.product.display_name}
                hideButton={true}
                readMoreCharacterLimit={60}
            />
        </div>
    )

    renderRating = () => {
        const count = dataChecking(this.props.product, 'review', 'count');
        const rating = dataChecking(this.props.product, 'review', 'rating');
        const rate = Math.round(rating / 2);
        const rateArr = [];

        if (count < 0 && rating < 0) {
            return null;
        }

        for (let i = 0; i < 5; i++) {
            if ((i + 1) <= rate) {
                rateArr.push(<Star key={`${this.props.product.id}-${i}`} style={{ color: '#FFD700' }} />);
            } else {
                rateArr.push(<StarBorder key={`${this.props.product.id}-${i}`} style={{ color: '#FFD700' }} />);
            }
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'row' }} className="product-rating">
                <div style={{ justifyContent: 'flex-start', display: 'flex', flexDirection: 'row' }}>
                    {rateArr}
                </div>
                <Typography variant="overline" style={{ marginLeft: 5, alignSelf: 'center' }}> ({count})</Typography>
            </div>
        );
    }

    render() {
        const product = dataChecking(this.props, 'product');
        const inStock = dataChecking(product, 'instock');
        const notifyMe = dataChecking(product, 'attribute', 'is_notifiable') && !dataChecking(product, '_user', 'notified');
        return (
            <Card className={`product-container ${this.props.disableElevation ? 'no-box-shadow' : ''}`}>
                <CardActionArea
                    onClick={() => this.handleClickImage()}
                >
                    {this.props.image && this.renderImage()}
                </CardActionArea>
                <CardContent className="product-content">
                    <Box>
                        {
                            this.props.allowDelete &&
                            <CardHeader
                                action={
                                    <IconButton
                                        onClick={() => this.props.allowDelete()}
                                        style={{ float: 'right', padding: 0 }}
                                    >
                                        <Cancel />
                                    </IconButton>
                                }
                                style={{ display: 'block' }}
                            />
                        }
                        {this.props.feature && this.renderFeature()}
                        {this.renderPrice()}
                        {this.renderBrand()}
                        {this.renderDescription()}
                        {this.props.rating && this.renderRating()}
                    </Box>
                </CardContent>
                {
                    this.props.addToCart ?
                        this.props.notifyMe ?
                            <Button
                                variant="contained"
                                color={inStock ? 'secondary' : 'primary'}
                                disabled={!notifyMe}
                                fullWidth={true}
                                className={`action-button ${inStock ? 'add-to-cart' : 'notify'}`}
                                onClick={inStock ? () => this.props.addToCart() : () => this.props.notifyMe()}
                            >
                                {inStock ? <AddShoppingCart /> : <NotificationImportant />}
                                <Typography variant="overline" className="pl-1">
                                    {
                                        inStock ?
                                            'Add to cart'
                                            :
                                            'Notify Me'
                                    }
                                </Typography>
                            </Button>
                            :
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={!inStock}
                                fullWidth={true}
                                className="action-button add-to-cart"
                                onClick={this.props.addToCart}
                            >
                                {inStock ? <AddShoppingCart /> : null}
                                <Typography variant="overline" className="pl-1">
                                    {
                                        inStock ?
                                            'Add to cart'
                                            :
                                            'Out of stock'
                                    }
                                </Typography>
                            </Button>
                        :
                        null
                }
            </Card>
        );
    }
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}
const withConnect = connect(mapDispatchToProps);

export default compose(
    withConnect,
    withRouter,
)(ProductCard);
