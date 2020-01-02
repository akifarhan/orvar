/**
*
* ProductSummary
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { dataDig } from 'globalUtils';

// import styled from 'styled-components';
import {
    Box,
    Button,
    Divider,
    Grid,
    Typography,
} from '@material-ui/core';
import {
    AddShoppingCart,
    NotificationImportant,
    Star,
    StarBorder,
} from '@material-ui/icons';

import ViewMoreText from 'components/ViewMoreText';

import './style.scss';

class ProductSummary extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    renderPrice = (product) => {
        const retailPrice = dataDig(product, 'price.retail');
        const sellingPrice = dataDig(product, 'price.selling');
        const discountText = dataDig(product, 'price.discount_text');
        const symbol = dataDig(product, 'currency.symbol');

        if (!retailPrice && !sellingPrice && !discountText) {
            return null;
        }

        return (
            <Box style={{ textAlign: 'center' }}>
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
            </Box>
        );
    }

    renderRating = () => {
        const count = dataDig(this.props.product, 'review.count');
        const rating = dataDig(this.props.product, 'review.rating');
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
            <Box style={{ display: 'flex', flexDirection: 'row' }} className="product-rating p-1">
                <Box style={{ justifyContent: 'flex-start', display: 'flex', flexDirection: 'row' }}>
                    {rateArr}
                </Box>
                <Typography variant="overline" style={{ marginLeft: 5, alignSelf: 'center' }}> ({count})</Typography>
            </Box>
        );
    }

    renderInfo = (title, value) => (
        <Grid container={true} key={title}>
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

    renderSpecification = (product) => (
        <Box>
            <Typography variant="h5" color="secondary">Products Specification</Typography>
            <Divider />
            {dataDig(product, 'brand.name') && this.renderInfo('Brand', product.brand.name)}
            {dataDig(product, 'display_name') && this.renderInfo('Name', product.display_name)}
            {
                dataDig(product, 'specification') && product.specification.map((sk) => {
                    if (dataDig(sk, 'value')) {
                        return this.renderInfo(sk.title, sk.value);
                    }
                    return null;
                })
            }
        </Box>
    )
    render = () => {
        const { product } = this.props;
        const inStock = dataDig(product, 'instock');
        const notifyMe = dataDig(product, 'attribute.is_notifiable') && !dataDig(product, '_user.notified');

        return (
            <Grid container={true} spacing={2}>
                <Grid item={true} xs={12} md={4}>
                    <Box>
                        <img
                            src={dataDig(product, 'image.large')}
                            alt={dataDig(product, 'name')}
                            width="100%"
                            height="100%"
                        />
                        {this.renderPrice(product)}
                        {
                            this.props.addToCart
                            &&
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
                        }
                        {this.renderRating()}
                    </Box>
                </Grid>
                <Grid item={true} xs={12} md={8}>
                    {this.renderSpecification(product)}
                </Grid>
            </Grid>
        );
    }
}

ProductSummary.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductSummary;
