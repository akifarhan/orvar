/**
*
* Cart
*
*/

import React from 'react';
// import styled from 'styled-components';
import { dataDig } from 'globalUtils';

import {
    Box,
    ButtonBase,
    Checkbox,
    Container,
    IconButton,
    Paper,
    Typography,
} from '@material-ui/core';

import {
    AddCircleOutlineRounded,
    Delete,
    RemoveCircleOutlineRounded,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import './style.scss';

class Cart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            checkAll: false,
        };
    }
    handleChangeCheckBox = (event) => {
        this.setState({ [event.target.id]: event.target.checked });
    }

    renderHeader = () => (
        <Paper>
            <Container className="cart-header flex-space-between">
                <Box component="span">
                    <Checkbox
                        id="checkAll"
                        checked={this.state.checkAll}
                        onChange={this.handleChangeCheckBox}
                        value="checkAll"
                    />
                    <Typography display="inline" variant="subtitle1">Select all available item</Typography>
                </Box>
                <IconButton style={{ color: 'black' }}>
                    <Delete />
                </IconButton>
            </Container>
        </Paper>
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
                <Typography variant="h6" style={{ paddingRight: `${discountText === null ? 0 : '10px'}`, fontWeight: 'bold' }}>
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

    renderItem = (index, product, qty) => {
        console.log();

        return (
            <Paper key={index}>
                <Container className="cart-item flex-space-between">
                    <Checkbox />
                    <Box className="item-image">
                        <img src={product.image.small} alt={product.plain_name} width="75px" height="75px" />
                    </Box>
                    <Box className="item-info">
                        {this.renderPrice(product)}
                        <Typography variant="subtitle2" color="primary">{product.display_name}</Typography>
                        <Box className="item-action flex-space-between">
                            <ButtonBase onClick={() => this.props.remove(index)}>
                                <Typography>Remove</Typography>
                            </ButtonBase>
                            <Box component="span">
                                <IconButton color="secondary">
                                    <RemoveCircleOutlineRounded />
                                </IconButton>
                                <Typography display="inline">{qty}</Typography>
                                <IconButton color="secondary">
                                    <AddCircleOutlineRounded />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Paper>
        );
    }
    render = () => {
        const { items } = this.props;
        return (
            <Box>
                {this.renderHeader()}
                {
                    items.map((item, index) => this.renderItem(index, item.product, item.qty))
                }
            </Box>
        );
    }
}

Cart.propTypes = {
    items: PropTypes.array, // Items in cart
    remove: PropTypes.func, // Function to remove item from cart
};

export default Cart;
