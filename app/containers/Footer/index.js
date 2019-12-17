/**
 *
 * Footer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import globalScope from 'globalScope';
import { dig, Events } from 'globalUtils';

import {
    Box,
    ButtonBase,
    Container,
    FormControl,
    Grid,
    Hidden,
    IconButton,
    Typography,
} from '@material-ui/core';

import {
    ChevronRightRounded,
    Mail,
    Phone,
} from '@material-ui/icons';

import InputForm from 'components/InputForm';
import makeSelectFooter from './selectors';
import { getFooterLayout } from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class Footer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            hideFooter: false,
            email: '',
        };

        Events.listen('hideFooter', 123456, () => {
            this.setState({ hideFooter: true });
        });
    }

    componentDidMount() {
        this.props.dispatch(getFooterLayout());
    }

    appsolutely = (className) => (
        <Grid className={className} container={true} spacing={1}>
            <Grid item={true}>
                <NavLink to="">
                    <img alt="Get it on App Store" src={`${globalScope.cdn}/hershop/temp/app-store-badge.svg`} style={{ width: '110px' }} />
                </NavLink>
            </Grid>
            <Grid item={true}>
                <NavLink to="">
                    <img alt="Get it on App Store" src={`${globalScope.cdn}/hershop/temp/google-play-badge.png`} style={{ width: '110px' }} />
                </NavLink>
            </Grid>
        </Grid>
    )
    footerLink = (items) => {
        const columnHeader = (title) => (
            <Box className="mb-2">
                <Typography className="footer-links-header text-uppercase" variant="h5" component="div">
                    <Box fontWeight="fontWeightBold" >{title}</Box>
                </Typography>
            </Box>
        );

        const columns = items.map((column, index) => {
            if (column.id === 'need-help') {
                return (
                    <Grid key={index} item={true} xs={3}>
                        <Container>
                            {columnHeader(column.title)}
                            <Box className="contact-info pb-1" style={{ borderBottom: '1px solid #404040' }}>
                                <Typography>
                                    <Phone className="mr-1" style={{ float: 'left' }} />
                                    <NavLink to={`tel:${column.data.contact_number}`} style={{ textDecoration: 'none' }}>
                                        {column.data.contact_number}
                                    </NavLink>
                                </Typography>
                                <br />
                                <Typography>
                                    <NavLink to={`mailto:${column.data.email}`} style={{ textDecoration: 'none' }}>
                                        {column.data.email}
                                    </NavLink>
                                </Typography>
                            </Box>
                            <Box className="pt-1">
                                <Typography>Operation Hours:</Typography>
                                <br />
                                <Typography>{column.data.working_day}</Typography>
                                <br />
                                <Typography component="div">
                                    <Box fontWeight="fontWeightBold" >{column.data.operation_hour}</Box>
                                </Typography>
                            </Box>
                        </Container>
                    </Grid>
                );
            }
            if (column.id === 'links') {
                return (
                    <Grid key={index} item={true} xs={3} style={{ borderLeft: '1px solid #404040' }}>
                        <Container>
                            {columnHeader(column.title)}
                            <Box>
                                {
                                    column.items.map((link) => (
                                        <NavLink key={link.url} to={link.url} style={{ textDecoration: 'none' }}>
                                            <Typography>{link.text}</Typography><br />
                                        </NavLink>
                                    ))
                                }
                            </Box>
                        </Container>
                    </Grid>
                );
            }
            if (column.id === 'social-links') {
                return (
                    <Grid key={index} item={true} xs={3} style={{ borderLeft: '1px solid #404040' }}>
                        <Container>
                            <Box className="social-links-connect-header text-uppercase mb-1">
                                <Typography variant="subtitle" component="div">
                                    <Box fontWeight="fontWeightBold" >{column.title}</Box>
                                </Typography>
                            </Box>
                            <Grid container={true} spacing={1}>
                                {
                                    column.items.map((item) => {
                                        if (item.type === 'facebook') {
                                            return (
                                                <Grid key={item.url} item={true}>
                                                    <NavLink to={item.url} style={{ textDecoration: 'none' }}>
                                                        <img src={require('resources/socialIcons/fb.png')} alt="facebook" style={{ width: '30px' }} />
                                                    </NavLink>
                                                </Grid>
                                            );
                                        }
                                        if (item.type === 'instagram') {
                                            return (
                                                <Grid key={item.url} item={true}>
                                                    <NavLink to={item.url} style={{ textDecoration: 'none' }}>
                                                        <Box>
                                                            <img src={require('resources/socialIcons/ig.png')} alt="instagram" style={{ width: '30px', borderRadius: '50%' }} />
                                                        </Box>
                                                    </NavLink>
                                                </Grid>
                                            );
                                        }
                                        return null;
                                    })
                                }
                            </Grid>
                            <Box className="social-links-download-header text-uppercase my-1">
                                <Typography variant="subtitle" component="div">
                                    <Box fontWeight="fontWeightBold" >Download our app</Box>
                                </Typography>
                            </Box>
                            {this.appsolutely()}
                        </Container>
                    </Grid>
                );
            }
            return null;
        });

        return (
            <Grid container={true} justify="space-between" style={{ color: '#FFF' }}>
                {columns}
                {/* ADD SUBSCRIBE HERE */}
                {/* <Grid item={true} xs={12}>
                    Subscribe
                </Grid> */}
            </Grid>
        );
    }

    footerSupport = (result) => (
        <Grid container={true}>
            <Grid className="py-1" item={true} xs={12}>
                <Box>
                    <img alt="Handcrafted in Malaysia" src={`${globalScope.cdn}//hershop/modules/footer/hermo_handcrafted.png`} style={{ float: 'right' }} />
                </Box>
            </Grid>
            <Grid className="py-half" item={true} xs={12} style={{ color: '#FFF', borderTop: '1px solid #404040', borderBottom: '1px solid #404040' }}>
                <Grid container={true} justify="space-between">
                    <Grid item={true}>
                        <Box component="span" display="inline">
                            <Typography className="mr-1">Now Shopping</Typography>
                            {
                                result.sites.map((site) => (
                                    <NavLink key={site.text} className={`site mr-1 ${site.is_active ? 'active' : ''}`} to={site.url} style={{ textDecoration: 'none' }}>
                                        <img className="mr-half" alt={site.flag} src={site.image} />
                                        <Typography>{site.text}</Typography>
                                    </NavLink>
                                ))
                            }
                        </Box>
                    </Grid>
                    <Grid item={true}>
                        <img alt="supported banks" src={result.image} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

    footerCopyright = (result) => (
        <Grid className="py-half" container={true} justify="space-between">
            <Grid item={true}>
                <img alt="payment-gateway" src={result.image} />
            </Grid>
            <Grid className="py-half" item={true}>
                <Typography variant="caption" style={{ color: '#fff' }}>
                    Copyright &copy; {result.copyright.company_name} ({result.copyright.company_registration}). {result.copyright.is_gst_applicable && `[GST Reg. No.: ${result.copyright.company_gst_no}]. `}All right reserved
                </Typography>
            </Grid>
        </Grid>
    )

    footerFeedback = () => (
        <Box>
            <Typography className="footer-feedback-header" variant="h6" component="div">
                <Box fontWeight="fontWeightBold" >Sign up & get two FREE masks.</Box>
            </Typography>
            <FormControl fullWidth={true} className="my-1 text-xs-center">
                <Grid container={true}>
                    <Grid item={true} xs={10} sm={9}>
                        <InputForm
                            id="email"
                            type="email"
                            placeholder="Subscribe with us! Enter your email."
                            handleChange={(event) => this.setState({ email: event.target.value })}
                            value={this.state.email}
                            onClear={() => this.setState({ email: '' })}
                        />
                    </Grid>
                    <Grid item={true} xs={2} sm={3}>
                        <IconButton>
                            <Mail />
                        </IconButton>
                    </Grid>
                </Grid>
            </FormControl>
        </Box>
    )

    footerInfo = (result) => (
        <Box className="my-1">
            <Grid container={true} spacing={2} justify="center">
                <Grid item={true}>
                    <NavLink to="/?ucf=mobile-footer">
                        <Typography variant="body2">Home</Typography>
                    </NavLink>
                </Grid>
                <Grid item={true}>
                    <NavLink to="/about#/contact?ucf=mobile-footer">
                        <Typography variant="body2">Need Help</Typography>
                    </NavLink>
                </Grid>
                <Grid item={true}>
                    <NavLink to="/partnerships?ucf=mobile-footer">
                        <Typography variant="body2">Partnership</Typography>
                    </NavLink>
                </Grid>
                <Grid item={true}>
                    <NavLink to="/about?ucf=mobile-footer">
                        <Typography variant="body2">About</Typography>
                    </NavLink>
                </Grid>
            </Grid>
            <Box className="appsolutely my-1">
                <NavLink to="/appsolutely-hermo?ucf=mobile-footer">
                    <Typography variant="subtitle" color="secondary">Hermo in your hand? APP-solutely <ChevronRightRounded style={{ float: 'right' }} /></Typography>
                </NavLink>
                {this.appsolutely('my-1')}
            </Box>
            <Box className="view-desktop my-1">
                <ButtonBase onClick={() => this.setState({ showDesktop: true })}>
                    <Typography><u>View desktop version</u></Typography>
                </ButtonBase>
            </Box>
            <Box className="copyright my-1">
                <Typography variant="caption">
                    Copyright &copy; {result.copyright.company_name} ({result.copyright.company_registration}). {result.copyright.is_gst_applicable && `[GST Reg. No.: ${result.copyright.company_gst_no}]. `}All right reserved
                </Typography>
            </Box>
        </Box>
    )

    footerDesktop = (modules) => {
        const sections = modules.map((section) => {
            if (section.id === 'footer-links') {
                return (
                    <Box key={section.id}>{this.footerLink(section.result.items)}</Box>
                );
            }
            if (section.id === 'footer-support') {
                return (
                    <Box key={section.id}>{this.footerSupport(section.result)}</Box>
                );
            }
            if (section.id === 'footer-copyright') {
                return (
                    <Box key={section.id}>{this.footerCopyright(section.result)}</Box>
                );
            }
            return null;
        });

        return (
            <Container className="p-3">
                {sections}
            </Container>
        );
    }

    footerMobile = (modules) => {
        let result;
        modules.map((items) => {
            if (items.id === 'footer-copyright') {
                result = items.result;
            }
            return null;
        });
        return (
            <Container>
                {this.footerFeedback()}
                {this.footerInfo(result)}
            </Container>
        );
    }
    render = () => {
        if (this.state.hideFooter) {
            return null;
        }

        if (dig(this.props.footer, 'layout.data')) {
            return (
                <Box className="footer">
                    <Hidden smDown={true}>
                        <Box className="footer-desktop" style={{ backgroundColor: '#222' }}>
                            {this.footerDesktop(this.props.footer.layout.data.modules)}
                        </Box>
                    </Hidden>
                    <Hidden mdUp={true}>
                        <Box className="footer-mobile" style={{ textAlign: 'center' }}>
                            {this.footerMobile(this.props.footer.layout.data.modules)}
                        </Box>
                    </Hidden>
                </Box>
            );
        }

        return null;
    }
}

Footer.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    footer: makeSelectFooter(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'footer', reducer });
const withSaga = injectSaga({ key: 'footer', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(Footer);
