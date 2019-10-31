/**
 *
 * AuthPage
 *
 */


import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Grid, Container, Hidden, Button, Typography } from '@material-ui/core';
import PopupDialog from 'components/PopupDialog';
import LoginForm from 'containers/LoginForm';
import SignUpPage from 'containers/SignUpPage';
import makeSelectAuthPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class AuthPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            tncModal: false,
            loading: true,
        };
    }

    onClickTnc = () => this.setState({ tncModal: true });
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };
    renderLite = () => {
        const variantLogin = this.state.login ? 'contained' : 'outlined';
        const variantSignup = this.state.login ? 'outlined' : 'contained';
        return (
            <div className="authpage-mobile mt-2">
                <Container className="btn">
                    <Grid container={true} spacing={1}>
                        <Grid item={true} xs={6}>
                            <Button
                                fullWidth={true}
                                variant={variantLogin}
                                color="primary"
                                className="btnLogin"
                                onClick={() => {
                                    this.setState({ login: true });
                                }}
                            >
                                <Typography>Log In</Typography>
                            </Button>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Button
                                fullWidth={true}
                                variant={variantSignup}
                                color="primary"
                                className="btnSignup"
                                onClick={() => {
                                    this.setState({ login: false });
                                }}
                            >
                                <Typography>Sign Up</Typography>
                            </Button>
                        </Grid>

                    </Grid>
                </Container>
                {this.state.login ? <LoginForm isModal={this.props.isModal} onClickTnc={this.onClickTnc} /> : <SignUpPage onClickTnc={this.onClickTnc} />}
            </div>
        );
    }

    renderTnc = () => (
        <div className="dialog-content-tnc" style={{ width: '100%', height: '100%' }}>
            {
                this.state.loading ?
                    <div className="tnc-iframe-loading">
                        <img className="tnc-preloader" src={require('images/preloader-02.gif')} alt="loading" />
                    </div>
                    :
                    null
            }
            <iframe
                title="terms and conditions"
                src="https://devshop2.hermo.my/about?ucf=login-modal&exclude_layout=true#/userterm"
                style={{ width: '100%', height: '100%' }}
                onLoad={() => this.setState({ loading: false })}
            />
        </div>
    )

    render() {
        return (
            <div>
                {
                    this.props.isModal ?
                        this.renderLite()
                        :
                        <div>
                            <Hidden smDown={true}>
                                <Container className="authpage-desktop">
                                    <Grid container={true} justify="space-evenly">
                                        <Grid item={true}>
                                            <LoginForm onClickTnc={this.onClickTnc} />
                                        </Grid>
                                        <Grid item={true}>
                                            <SignUpPage onClickTnc={this.onClickTnc} />
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Hidden>
                            <Hidden mdUp={true}>
                                {this.renderLite()}
                            </Hidden>
                        </div>
                }
                <PopupDialog
                    display={this.state.tncModal}
                    onClose={() => this.setState({ tncModal: false, loading: true })}
                    fullScreen={true}
                >
                    {this.renderTnc()}
                </PopupDialog>
            </div>
        );
    }
}

AuthPage.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    authPage: makeSelectAuthPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'authPage', reducer });
const withSaga = injectSaga({ key: 'authPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(AuthPage);
