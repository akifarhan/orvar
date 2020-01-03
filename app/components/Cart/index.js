/**
*
* Cart
*
*/

import React from 'react';
// import styled from 'styled-components';

import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@material-ui/core';

import {
    Close,
} from '@material-ui/icons';
import PropTypes from 'prop-types';

import './style.scss';

class Cart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render = () => {
        const { items } = this.props;
        return (
            <Box component={Paper}>
                <Table aria-label="items in cart table">
                    <TableHead>
                        <TableRow className="text-uppercase">
                            <TableCell align="center" colSpan={2}>Cart Items</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <img src={item.image.small} alt={item.plain_name} width="75px" height="75px" />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{item.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        {item.currency.symbol}{Number(item.price.selling).toFixed(2)}
                                    </TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>
                                        {item.currency.symbol}{Number(item.price.selling).toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <Close />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        <TableRow>
                            <TableCell colSpan={4} align="right">Total</TableCell>
                            <TableCell>RM1</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        );
    }
}

Cart.propTypes = {
    items: PropTypes.array, // Items in cart
};

export default Cart;
