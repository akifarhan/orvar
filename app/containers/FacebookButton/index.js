/**
 *
 * FacebookButton
 *
 */

/* global FB */
import React from 'react';
import PropTypes from 'prop-types';
import globalScope from 'globalScope';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Button, FormControl } from '@material-ui/core';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { postFb } from './actions';
import makeSelectFacebookButton from './selectors';
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

export class FacebookButton extends React.PureComponent {
    componentDidMount() {
        window.fbAsyncInit = () => {
            FB.init({
                appId: '1392058637684776',
                cookie: true,
                xfbml: true,
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
        if (nextProps.facebookButton.fb.success !== this.props.facebookButton.fb.success && nextProps.facebookButton.fb.success) {
            window.location.href = globalScope.previousPage || '/';
            console.log(window.location.href);
        }
    }

    loginFb = (authResponse) => {
        FB.api('/me', { fields: 'email, name' }, (response) => {
            const payload = {
                id: response.id,
                email: response.email,
                token: authResponse.accessToken,
            };
            this.props.dispatch(postFb(payload));
        });
    }

    statusChangeCallback(response) {
        if (response.status === 'connected') {
            this.loginFb(response.authResponse);
        }
    }
    checkLoginState() {
        FB.getLoginStatus((response) => {
            this.statusChangeCallback(response);
        });
    }
    handleFBLogin() {
        FB.login(() => {
            this.checkLoginState();
        }, { scope: 'email', return_scopes: true });
    }

    render() {
        const fbLogo = <img src={require('./rsc/fb_logo.png')} alt="Facebook" />;
        return (
            <FormControl fullWidth={true}>
                {
                    this.props.isLogin ?
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
}

FacebookButton.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    facebookButton: makeSelectFacebookButton(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'facebookButton', reducer });
const withSaga = injectSaga({ key: 'facebookButton', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(FacebookButton);
