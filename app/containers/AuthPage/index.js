/**
 *
 * AuthPage
 *
 */

/* global FB */

import React from 'react';
// import PropTypes from 'prop-types';
import globalScope from 'globalScope';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Grid, Container, Hidden, Button, Typography, Divider, FormControl } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import LoginForm from 'containers/LoginForm';
import SignUpPage from 'containers/SignUpPage';
import InputForm from 'components/InputForm';
import PopupDialog from 'components/PopupDialog';
import makeSelectAuthPage from './selectors';
import { resetPassword } from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            startIcon: {
                position: 'absolute',
                left: '0px',
                padding: '2rem',
            },
            root: {
                fontFamily: 'Poppins',
                textTransform: 'none',
                fontSize: '1rem',
            },
        },
    },
});

export class AuthPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            forgotDialog: false,
            forgotEmail: '',
        };
    }

    componentDidMount() {
        window.fbAsyncInit = () => {
            FB.init({
                appId: globalScope.fb_id,
                cookie: true,
                xgbml: true,
                version: 'v4.0',
            });
        };

        // eslint-disable-next-line func-names
        (function (d, s, id) {
            let js = d.getElementsByTagName(s)[0];
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.authPage.resetSuccess !== this.props.authPage.resetSuccess && nextProps.authPage.resetSuccess) {
            this.setState({ forgotDialog: false, forgotEmail: '' });
        }
    }
    onClickForgot = () => this.setState({ forgotDialog: true })
    onClose = () => {
        this.setState({
            forgotDialog: false,
            forgotEmail: '',
        });
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };


    testAPI = () => {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', (response) => {
            console.log(`Successful login for: ${response.name}`);
            document.getElementById('status').innerHTML =
        `Thanks for logging in, ${response.name}!`;
        });
    }

    statusChangeCallback(response) {
        if (response.status === 'connected') {
            this.testAPI();
        } else if (response.status === 'not_authorized') {
            console.log('Please log into this app.');
        } else {
            console.log('Please log into this facebook.');
        }
    }
    checkLoginState() {
        FB.getLoginStatus((response) => {
            this.statusChangeCallback(response);
        });
    }
    handleFBLogin() {
        FB.login(() => this.checkLoginState());
    }

    renderFacebook = (isLogin) => {
        const fbLogo = <img src={require('./rsc/fb_logo.png')} alt="Facebook" />;
        return (
            <FormControl fullWidth={true}>
                {
                    isLogin ?
                        <ThemeProvider theme={theme}>
                            <Button
                                className="btn-facebook-login"
                                id="btn-social-login"
                                type="button"
                                variant="contained"
                                style={{ backgroundColor: '#3b5998', color: 'white' }}
                                onClick={() => this.handleFBLogin()}
                                startIcon={fbLogo}
                            >
                                Login with Facebook
                            </Button>
                        </ThemeProvider>
                        :
                        <ThemeProvider theme={theme}>
                            <Button
                                className="btn-facebook-signup"
                                id="btn-social-login"
                                type="button"
                                variant="contained"
                                style={{ backgroundColor: '#3b5998', color: 'white' }}
                                startIcon={fbLogo}
                                onClick={() => this.handleFBLogin()}
                            >
                                Sign up with Facebook
                            </Button>
                        </ThemeProvider>
                }
            </FormControl>
        );
    }
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
                {this.state.login ? <LoginForm isModal={this.props.isModal} onClickForgot={this.onClickForgot} fb={this.renderFacebook} /> : <SignUpPage isModal={this.props.isModal} fb={this.renderFacebook} />}
            </div>
        );
    }

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
                                            <LoginForm onClickForgot={this.onClickForgot} fb={this.renderFacebook} />
                                        </Grid>
                                        <Grid item={true}>
                                            <SignUpPage fb={this.renderFacebook} />
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
                    display={this.state.forgotDialog}
                    title="Reset Your Password"
                    onClose={() => this.onClose()}
                >
                    <Divider />
                    <form onSubmit={() => { this.props.dispatch(resetPassword(this.state.forgotEmail)); event.preventDefault(); }}>
                        <div className="p-1" style={{ textAlign: 'center' }} >
                            <Typography variant="body1">Please enter your registered email address so we can send you the reset instructions.</Typography>
                        </div>
                        <FormControl fullWidth={true}>
                            <InputForm
                                label="Email address"
                                placeholder="Enter your registered email address"
                                id="forgotEmail"
                                type="email"
                                handleChange={this.handleChange}
                                value={this.state.forgotEmail}
                                onClear={() => {
                                    this.setState({ forgotEmail: '' });
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <Button type="submit" variant="contained" color="primary">
                                Send me the instructions
                            </Button>
                        </FormControl>
                    </form>
                    <div className="p-1" style={{ textAlign: 'center' }} >
                        <Divider />
                        <Typography variant="caption">Trouble logging in? Drop our helpdesk an email <a href="mailto:admin@hermo.my" style={{ color: '#603' }}>admin@hermo.my</a> or call <a href="tel:+607-5623567" style={{ color: '#603' }}>07-5623567</a></Typography>
                    </div>
                </PopupDialog>
            </div>
        );
    }
}

// AuthPage.propTypes = {
//     dispatch: PropTypes.func.isRequired,
// };

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
