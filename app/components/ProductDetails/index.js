/**
*
* ProductDetails
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { dataDig } from 'globalUtils';

// import styled from 'styled-components';
import {
    Avatar,
    Box,
    Button,
    Chip,
    Container,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    IconButton,
    TextField,
    Typography,
} from '@material-ui/core';
import {
    Add,
    AddShoppingCart,
    ExpandMore,
    NotificationImportant,
    Remove,
    Star,
    StarBorder,
} from '@material-ui/icons';

import ProductDescription from 'containers/ProductDescription';
import ProductInfo from 'containers/ProductInfo';

import './style.scss';

class ProductDetails extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    renderImage = (product) => (
        <Box className="product-image-container">
            <Box className="feature-container">
                {
                    dataDig(product, 'features.length') && dataDig(product, 'features').map((feature, index) => {
                        if (feature.type === 'image') {
                            return (
                                <img
                                    key={index}
                                    className="feature-symbol"
                                    src={dataDig(feature, 'value')}
                                    alt="product-feature"
                                    width="40px"
                                    height="40px"
                                />
                            );
                        }
                        return null;
                    })
                }
            </Box>
            <Box className="product-image">
                <img
                    src={dataDig(product, 'image.large')}
                    alt={dataDig(product, 'name')}
                    width="100%"
                    height="100%"
                />
            </Box>
        </Box>
    )

    renderPrice = (product) => {
        const retailPrice = dataDig(product, 'price.retail');
        const sellingPrice = dataDig(product, 'price.selling');
        const discountText = dataDig(product, 'price.discount_text');
        const symbol = dataDig(product, 'currency.symbol');

        if (!retailPrice && !sellingPrice && !discountText) {
            return null;
        }

        return (
            <Box>
                <Typography variant="h4" style={{ paddingRight: `${discountText === null ? 0 : '10px'}`, fontWeight: 'bold' }}>
                    {symbol} {sellingPrice.toFixed(2)}
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

    renderName = (product) => (
        <Box className="product-section product-name">
            {/* <Box className="brand-logo">
                <img
                    src={dataDig(product, 'brand.logo')}
                    alt={dataDig(product, 'brand.name')}
                    width="60px"
                    height="60px"
                />
            </Box> */}
            <Avatar
                className={`brand-logo ${dataDig(product, 'brand.logo') === null && 'no-logo'}`}
                src={dataDig(product, 'brand.logo')}
                alt={dataDig(product, 'brand.name')}
            >
                {dataDig(product, 'brand.logo') === null && <Typography>{dataDig(product, 'brand.name')}</Typography>}
            </Avatar>
            <Box className="brand-name">
                <Typography color="primary" style={{ fontWeight: 'bold' }}>{dataDig(product, 'brand.name')}</Typography>
                <Typography>{dataDig(product, 'display_name') || dataDig(product, 'name')}</Typography>
            </Box>
        </Box>
    )
    renderRating = (product) => {
        const count = dataDig(product, 'review.count');
        const rating = dataDig(product, 'review.rating');
        const rate = Math.round(rating / 2);
        const rateArr = [];

        if (count < 0 && rating < 0) {
            return null;
        }

        for (let i = 0; i < 5; i++) {
            if ((i + 1) <= rate) {
                rateArr.push(<Star key={`${product.id}-${i}`} style={{ color: '#FFD700' }} />);
            } else {
                rateArr.push(<StarBorder key={`${product.id}-${i}`} style={{ color: '#FFD700' }} />);
            }
        }

        return (
            <Box style={{ display: 'flex', flexDirection: 'row' }} className="product-section rating pl-1">
                <Box style={{ justifyContent: 'flex-start', display: 'flex', flexDirection: 'row' }}>
                    {rateArr}
                </Box>
                <Typography variant="overline" style={{ marginLeft: 5, alignSelf: 'center' }}> ({count})</Typography>
            </Box>
        );
    }

    renderHashtags = (product) => (
        <Box className="product-section hashtags">
            {
                product.hashtags.map((hashtag, index) => (
                    <Chip key={index} label={`#${hashtag.name}`} disabled={true} style={{ marginRight: '0.2rem' }} />
                ))
            }
        </Box>
    )

    renderDetails = (product) => (
        <Box className="product-section details">
            {
                this.props.changeQty
                &&
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        id="quantity"
                    >
                        <Box>
                            <Typography variant="subtitle1" display="inline">Quantity</Typography><Typography variant="subtitle1" display="inline" style={{ color: 'red' }}> *</Typography>
                            <br />
                            <Typography variant="caption">Please select the quantity</Typography>
                        </Box>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Box className="action-quantity" component="span" style={{ margin: 'auto' }}>
                            <IconButton disabled={this.props.qty === 1} onClick={() => this.props.changeQty('-')}>
                                <Remove />
                            </IconButton>
                            <TextField
                                id="qty"
                                variant="outlined"
                                onChange={this.props.handleChangeNumber}
                                value={this.props.qty}
                                size="small"
                                style={{ width: '4rem' }}
                            />
                            <IconButton onClick={() => this.props.changeQty('+')}>
                                <Add />
                            </IconButton>
                        </Box>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            }
            {
                dataDig(product, 'description')
                &&
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMore />}
                        id="description"
                    >
                        <Typography variant="subtitle1" color="primary">Description</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ProductDescription product={product} />
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            }
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    id="spec"
                >
                    <Typography variant="subtitle1" color="primary">Spec and usage</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <ProductInfo product={product} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Box>
    )

    renderAddToCart = (product) => {
        const inStock = dataDig(product, 'instock');
        const notifyMe = dataDig(product, 'attribute.is_notifiable') && !dataDig(product, '_user.notified');
        return (
            <Box className="action-button">
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
            </Box>
        );
    }

    render = () => {
        const { product } = this.props;
        return (
            <Box className="product-details">
                <Box>
                    <Container>
                        {this.renderImage(product)}
                        {this.renderPrice(product)}
                        {this.renderName(product)}
                        {this.renderRating(product)}
                        {dataDig(product, 'hashtags.length') && this.renderHashtags(product)}
                    </Container>
                    {this.renderDetails(product)}
                    {this.renderAddToCart(product)}
                </Box>
            </Box>
        );
    }
}

ProductDetails.propTypes = {
    product: PropTypes.object.isRequired, // Product informations
    addToCart: PropTypes.func, // Function for add item to cart
    notifyMe: PropTypes.func, // Function for notify user when item in stock
    qty: PropTypes.number, // Number of quantity of the item (State)
    handleChangeNumber: PropTypes.func, // Function for handling changes for number
    changeQty: PropTypes.func, // Function for change quantity using button
};

export default ProductDetails;
