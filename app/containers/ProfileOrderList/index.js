/**
 *
 * ProfileOrderList
 *
 */

import React from 'react';
import { dataChecking } from 'globalUtils';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import moment from 'moment';
import NavTab from 'components/NavigationTab';

import {
    Card,
    Chip,
    CircularProgress,
    Container,
    Hidden,
    IconButton,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@material-ui/core';
import {
    KeyboardArrowRight,
    QueryBuilder,
} from '@material-ui/icons';

import makeSelectProfileOrderList from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileOrderList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        anchorEl: null,
        orderDate: '',

        page: 0,
        rowsPerPage: 10,
    }

    componentWillMount() {
        this.props.dispatch(actions.getOrderList(10));
    }

    renderStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return '#71F888';
            case 'received':
                return '#98DBFF';
            case 'unpaid':
                return '#EEEEEE';
            case 'in process':
                return '#FCCC4C';
            case 'multiple':
                return '#FC4CCD';
            case 'expired':
                return '#FDC789';
            case 'posted':
                return '#660033';
            case 'cancel':
                return '#FFFFFF';
            default:
                break;
        }

        return null;
    }

    renderOrderListCard = () => {
        if (!this.props.profileOrderList.orderList) {
            return null;
        }

        return (
            <Card style={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography>Order</Typography></TableCell>
                            <Hidden xsDown={true}>
                                <TableCell><Typography>Date Created</Typography></TableCell>
                                <TableCell><Typography>Courier</Typography></TableCell>
                            </Hidden>
                            <TableCell><Typography>Amount</Typography></TableCell>
                            <TableCell><Typography>Status</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataChecking(this.props.profileOrderList, 'orderList') &&
                            this.props.profileOrderList.orderList.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <NavLink to={`order/${order.id}`} style={{ textDecoration: 'none' }}>
                                            <Typography color="secondary">
                                                {order.number}
                                            </Typography>
                                            <IconButton size="small">
                                                <KeyboardArrowRight color="secondary" />
                                            </IconButton>
                                        </NavLink>
                                    </TableCell>
                                    <Hidden xsDown={true}>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                style={{ marginRight: 5 }}
                                                onClick={(event) => {
                                                    this.setState({
                                                        anchorEl: event.currentTarget,
                                                        orderDate: order.created_at,
                                                    });
                                                }}
                                            >
                                                <QueryBuilder />
                                            </IconButton>
                                            <Typography>{moment(order.created_at).fromNow()}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{order.courier}</Typography>
                                        </TableCell>
                                    </Hidden>
                                    <TableCell>
                                        <Typography>{order.currency.symbol + order.subtotal.toFixed(2)}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.status}
                                            variant="outlined"
                                            size="small"
                                            style={{
                                                backgroundColor: this.renderStatusColor(order.status),
                                                color: (order.status.toLowerCase() === 'multiple' || order.status.toLowerCase() === 'posted') ? '#FFFFFF' : '#000000',
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[10, 25, 40]}
                    rowsPerPage={this.state.rowsPerPage}
                    count={dataChecking(this.props.profileOrderList, 'orderMeta', 'totalCount')}
                    page={this.state.page}
                    onChangePage={(event, newPage) => {
                        this.setState({ page: newPage });
                    }}
                    onChangeRowsPerPage={(event) => {
                        this.props.dispatch(actions.getOrderList(event.target.value));
                        this.setState({ rowsPerPage: event.target.value });
                        this.setState({ page: 0 });
                    }}
                />
            </Card>
        );
    }

    render() {
        return (
            <div>
                <NavTab
                    isLinked="true"
                    isFiltered="true"
                    tabs={[
                        {
                            title: 'All Orders',
                            description: (
                                <div align="center" style={{ margin: 16 }}>
                                    <Typography variant="h6" display="block" gutterBottom={true}>All orders</Typography>
                                    <Typography display="block">Click on the order number to view your order details.</Typography>
                                    <Typography>Confirm receipt of your order to get 20 credits.</Typography>
                                </div>
                            ),
                            content: (
                                <Container>
                                    {
                                        this.props.profileOrderList.loading ?
                                            <div style={{ textAlign: 'center' }}><CircularProgress /></div>
                                            :
                                            <div>
                                                {this.renderOrderListCard()}
                                            </div>
                                    }
                                    <Popover
                                        open={Boolean(this.state.anchorEl)}
                                        anchorEl={this.state.anchorEl}
                                        onClose={() => {
                                            this.setState({ anchorEl: null });
                                        }}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <div style={{ padding: 10 }}><Typography>{this.state.orderDate}</Typography></div>
                                    </Popover>
                                </Container>
                            ),
                        },
                        {
                            title: 'Unpaid',
                            content: (
                                <div>
                                    UNPAID ORDERS
                                </div>
                            ),
                        },
                        {
                            title: 'To Ship',
                            content: (
                                <div>
                                    TO SHIP ORDERS
                                </div>
                            ),
                        },
                        {
                            title: 'Posted',
                            content: (
                                <div>
                                    POSTED ORDERS
                                </div>
                            ),
                        },
                        {
                            title: 'Review',
                            content: (
                                <div>
                                    IN REVIEW ORDERS
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        );
    }
}

ProfileOrderList.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileOrderList: makeSelectProfileOrderList(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileOrderList', reducer });
const withSaga = injectSaga({ key: 'profileOrderList', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileOrderList);
