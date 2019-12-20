/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Favorite from '@material-ui/icons/Favorite';

import withStyles from '@material-ui/core/styles/withStyles';


import Carousel from 'components/Carousel';
import HtmlParser from 'components/HtmlParser';
import ProductCard from 'components/ProductCard';
import ViewMoreText from 'components/ViewMoreText';

import { dig } from 'globalUtils';
import globalScope from 'globalScope';
import makeSelectHomePage from './selectors';
import {
    getHomeBanner,
    getFlagship,
    getTwoh,
    getNewArrival,
    getTrending,
    getSponsored,
    // getExtension,
    getPersonalisation,
    getReview,
    getFooterLayout,
    getFooterImage,
    getFooterPartner,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import styles from './materialStyle';


export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(getHomeBanner());
        this.props.dispatch(getFlagship());
        this.props.dispatch(getTwoh());
        this.props.dispatch(getNewArrival());
        this.props.dispatch(getTrending());
        this.props.dispatch(getSponsored());
        // this.props.dispatch(getExtension());
        this.props.dispatch(getPersonalisation());
        this.props.dispatch(getReview());
        this.props.dispatch(getFooterLayout());
        this.props.dispatch(getFooterImage());
        this.props.dispatch(getFooterPartner());
    }

    /**
     * display header for each section
     */
    sectionHeader = (section) => (
        <Box className={`section-title mb-2 ${dig(section, 'data.cta') && section.data.cta.color === 'light' ? 'light-cta' : 'dark-cta'}`}>
            <Typography className="text-uppercase" align="center" variant="h4" component="div"><Box fontWeight="fontWeightBold" >{section.title}</Box></Typography>
            <Typography className="text-capitalize" align="center" variant="subtitle1">{section.description}</Typography>
        </Box>
    )

    homeBanner = () => {
        const homeBanner = this.props.homePage.homeBanner.data.result.items.map((item, index) => (
            <Box key={index}>
                <NavLink to={item.url}>
                    <img
                        src={item.image.desktop}
                        alt={item.name}
                        srcSet={`
                            ${item.image.desktop} 2000w,
                            ${item.image.mobile} 1000w,
                        `}
                        width="100%"
                        height="100%"
                    />
                </NavLink>
            </Box>
        ));

        return (
            <Box className="home-banner-content">
                {
                    homeBanner &&
                    <Carousel
                        settings={{
                            // dots: true,
                            autoplay: true,
                            autoplaySpeed: 5000,
                        }}
                    >
                        { homeBanner }
                    </Carousel>
                }
            </Box>
        );
    }

    flagship = () => {
        const homeFlagship = this.props.homePage.flagship.data.items.map((item, index) => (
            <Box key={index}>
                <NavLink to={item.url}>
                    <img
                        src={item.brand.logo}
                        alt={item.name}
                        width="100%"
                        height="100%"
                    />
                </NavLink>
            </Box>
        ));

        return (
            <Container className="home-section flagship-content">
                {this.sectionHeader({ title: 'official flagships stores', description: 'authorised & authentic' })}
                {
                    homeFlagship &&
                    <Carousel
                        settings={{
                            centerMode: true,
                            slidesToShow: 5,
                            responsive: [
                                {
                                    breakpoint: 600,
                                    settings: {
                                        slidesToShow: 1,
                                    },
                                },
                            ],
                        }}
                    >
                        {homeFlagship}
                    </Carousel>
                }
                <Box className="text-xs-center mb-1">
                    <Button variant="contained" color="primary">
                        view all flagships
                    </Button>
                </Box>
            </Container>
        );
    }

    twoh = () => {
        const twohData = dig(this.props.homePage, 'twoh.data');

        const homeTwoh = twohData.result.map((column, index) => (
            <Grid key={index} item={true} xs={6}>
                <Grid container={true} direction="column" spacing={2}>
                    <Grid item={true} xs={12}>
                        {
                            dig(column, 'primary.items.length') && column.primary.items.map((primary) => (
                                <Card className={this.props.classes.cardTwohPrimary} key={primary.id}>
                                    <NavLink to={primary.url}>
                                        <Box>
                                            <img
                                                src={primary.image.desktop}
                                                alt={primary.name}
                                                srcSet={`
                                                    ${primary.image.desktop} 2000w,
                                                    ${primary.image.mobile} 1000w,
                                                `}
                                                width="100%"
                                                height="100%"
                                            />
                                            <Box className="px-1">
                                                <Typography className="twoh-card-title text-uppercase" variant="h6">{primary.title}</Typography>
                                                <Typography className="twoh-card-brief" variant="body1">{primary.brief}</Typography>
                                            </Box>
                                        </Box>
                                    </NavLink>
                                </Card>
                            ))
                        }
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Grid container={true} spacing={2}>
                            {
                                dig(column, 'secondary.items.length') && column.secondary.items.map((secondary) => (
                                    <Grid key={secondary.id} item={true} xs={6}>
                                        <Card className={this.props.classes.cardTwohSecondary}>
                                            <Box>
                                                <NavLink to={secondary.url} style={{ textDecoration: 'none' }}>
                                                    <img
                                                        src={secondary.image.desktop}
                                                        alt={secondary.name}
                                                        srcSet={`
                                                            ${secondary.image.desktop} 2000w,
                                                            ${secondary.image.mobile} 1000w,
                                                        `}
                                                        width="100%"
                                                        height="100%"
                                                    />
                                                    <Box className="px-1">
                                                        <Typography className="twoh-card-title text-uppercase" variant="h6">{secondary.title}</Typography>
                                                        <Typography className="twoh-card-brief" variant="body1">{secondary.brief}</Typography>
                                                    </Box>
                                                </NavLink>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        ));


        return (
            <Container className="home-section twoh-content">
                {this.sectionHeader({ title: dig(twohData, 'title') || 'this week on hermo', description: dig(twohData, 'description') || '' })}
                <Box className="twoh-container">
                    <Grid className={this.props.classes.gridContainerTwoh} container={true} spacing={2}>
                        {homeTwoh}
                    </Grid>
                </Box>
            </Container>
        );
    }

    newArrival = () => {
        const newArrivalData = dig(this.props.homePage, 'newArrival.data');
        const latestTrends = newArrivalData.latest_trends.items.map((product) => (
            <Box className="p-half" key={product.id}>
                <ProductCard
                    key={product.id}
                    product={product}
                    url={product.url}
                    image={true}
                />
            </Box>
        ));

        return (
            <Container className="home-section new-arrival-content">
                {this.sectionHeader({ title: dig(newArrivalData, 'title') || 'new arrivals', description: 'checkout the latest and hottest!' })}
                <Carousel
                    settings={{
                        slidesToShow: 5,
                        responsive: [
                            {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 1,
                                    centerMode: true,
                                },
                            },
                        ],
                    }}
                >
                    {latestTrends}
                </Carousel>
            </Container>
        );
    }

    hotStuff = (title, description, products) => (
        <Grid item={true} xs={12} md={6}>
            <Card>
                <Box className="p-1">
                    {this.sectionHeader({ title, description })}
                    <Divider />
                    <CardContent>
                        <Carousel
                            settings={{
                                slidesToShow: 2,
                                responsive: [
                                    {
                                        breakpoint: 600,
                                        settings: {
                                            slidesToShow: 1,
                                            centerMode: true,
                                        },
                                    },
                                ],
                            }}
                        >
                            {
                                    products.map((product) => (
                                        <Box className="p-1" key={product.id}>
                                            <ProductCard
                                                product={product}
                                                url={product.url}
                                                image={true}
                                            />
                                        </Box>
                                    ))
                                }
                        </Carousel>
                    </CardContent>
                </Box>
            </Card>
        </Grid>
        )

    sponsor = () => (
        <Box className="home-section sponsored-content">
            {
                this.props.homePage.sponsored.data.result.items.map((item) => {
                    const content = (
                        <Container>
                            <Box className={`sponsor-label text-uppercase text-xs-center ${item.cta.color === 'light' ? 'dark-cta light-bg' : 'light-cta dark-bg'}`}>
                                <Typography variant="h6">Featured Brand</Typography>
                            </Box>
                            {this.sectionHeader({ title: item.cta.button_text, data: item })}
                            <Paper className="p-1 my-1">
                                <Carousel
                                    settings={{
                                        slidesToShow: 3,
                                        responsive: [
                                            {
                                                breakpoint: 600,
                                                settings: {
                                                    slidesToShow: 1,
                                                },
                                            },
                                        ],
                                    }}
                                    disableArrow={item._product.items.length < 4}
                                >
                                    {
                                        item._product.items.map((product) => (
                                            <Box className="p-1" key={product.id}>
                                                <ProductCard
                                                    product={product}
                                                    url={product.url}
                                                    image={true}
                                                />
                                            </Box>
                                        ))
                                    }
                                </Carousel>
                            </Paper>
                            <NavLink to={item.url} style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary">Shop now</Button>
                            </NavLink>
                        </Container>
                    );

                    return (
                        <Box className="home-sponsored-item" key={item.id}>
                            <Hidden smDown={true}>
                                <Box className="px-2 pb-2 sponsored-item-desktop" style={{ backgroundImage: `url(${item.image.desktop})`, textAlign: 'center', backgroundSize: 'cover' }}>
                                    {content}
                                </Box>
                            </Hidden>
                            <Hidden mdUp={true}>
                                <Box className="sponsored-item-mobile" style={{ backgroundImage: `url(${item.image.mobile})` }}>
                                    {content}
                                </Box>
                            </Hidden>
                        </Box>
                    );
                })
            }
        </Box>
    )

    extension = () => (
        <Container className="home-section extension-content">
            This is extension section.
        </Container>
    )

    personalisation = (data) => {
        const products = data.product.items.map((product) => (
            <Box className="p-half" key={product.id}>
                <ProductCard
                    product={product}
                    url={product.url}
                    image={true}
                />
            </Box>
        ));

        return (
            <Container className="home-section personalisation-content">
                {
                    this.sectionHeader({
                        title: dig(data, 'headline.title.text'),
                        description: dig(data, 'headline.title.description'),
                    })
                }
                <Carousel
                    settings={{
                        slidesToShow: 5,
                        responsive: [
                            {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 1,
                                    centerMode: true,
                                },
                            },
                        ],
                    }}
                >
                    {products}
                </Carousel>
            </Container>
        );
    }

    reviews = () => {
        const reviewsCards = this.props.homePage.review.data.result.items.map((review) => {
            this.state = {
                src: review.image.square,
            };
            return (
                <Box className="p-1" key={review.id}>
                    <Card className={this.props.classes.cardReview}>
                        <CardHeader
                            avatar={<Avatar src={review.avatar} alt={`${review.username} avatar`} />}
                            title={review.username}
                            subheader={review.created_text}
                            action={
                                <div>
                                    <Favorite />
                                    <Typography>{review.like_count}</Typography>
                                </div>
                            }
                        />
                        <Divider />
                        <Box className="p-1">
                            <Grid container={true} spacing={2}>
                                <Grid item={true} xs={3}>
                                    <img
                                        src={!dig(this.state, 'src') ? `${globalScope.cdn}/hershop/fallback-image.jpg` : dig(this.state, 'src')}
                                        alt="review product"
                                        onError={() => this.setState({ src: `${globalScope.cdn}/hershop/fallback-image.jpg` })}
                                        width="100%"
                                        height="100%"
                                    />
                                </Grid>
                                <Grid item={true} xs={9}>
                                    <ViewMoreText
                                        text={review.comment}
                                        hideButton={true}
                                        readMoreCharacterLimit={150}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Box>
            );
        });

        return (
            <Box className="home-section review-content text-xs-center">
                {this.sectionHeader({
                    title: dig(this.props.homePage, 'review.data.title') || 'beauty reviews',
                    description: dig(this.props.homePage, 'review.data.description') || 'share your beauty stories',
                })}
                <Carousel
                    settings={{
                        slidesToShow: 3,
                        centerMode: true,
                        responsive: [
                            {
                                breakpoint: 600,
                                settings: {
                                    slidesToShow: 1,
                                },
                            },
                        ],
                    }}
                    disableArrow={true}
                >
                    {reviewsCards}
                </Carousel>
                <NavLink to={this.props.homePage.review.data.url} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="primary">See all reviews</Button>
                </NavLink>
            </Box>
        );
    }

    homeFooter = (layout, image, partner) => {
        const partnerLogos = partner.items.map((item) => (
            <Grid key={item.id} item={true}>
                <Avatar src={item.image.desktop} alt={item.name} style={{ border: '2px solid #DDD' }} />
            </Grid>
        ));
        return (
            <Container style={{ color: '#f2f2f2' }}>
                <Grid container={true}>
                    <Grid className="pr-2" item={true} xs={8}>
                        <img
                            src={image.items[0].image.desktop || null}
                            alt={image.items[0].name}
                            width="20%"
                            height="30px"
                        />
                        <Box className="py-1">
                            <Typography>
                                <HtmlParser html={layout.modules[0].result.text} />
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid className="pt-1 pl-2" item={true} xs={4} style={{ borderLeft: '1px solid #404040' }}>
                        <Typography className="partner-title text-uppercase" variant="h5" component="div"><Box fontWeight="fontWeightBold" >{layout.modules[1].result.title}</Box></Typography>
                        <Typography className="py-2 partner-body">{layout.modules[1].result.text}</Typography>
                        <Grid container={true} justify="space-evenly" alignItems="center">
                            {partnerLogos}
                        </Grid>
                        <Box className="partner-button mt-2" style={{ textAlign: 'center' }}>
                            <NavLink to="/partnerships?ucf=footer" style={{ textDecoration: 'none' }}>
                                <Button variant="contained">View all partners</Button>
                            </NavLink>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        );
    }

    render = () => (
        <Box className="home-page">
            <Helmet>
                <title>Hermo</title>
                <meta name="description" content="Hermo Malaysia" />
            </Helmet>
            <Box className="home-page-content">
                <Box className="home-banner-section mb-2">
                    {dig(this.props.homePage, 'homeBanner.data.result.items.length') && this.homeBanner()}
                </Box>
                <Box className="home-section flagship my-2">
                    {dig(this.props.homePage, 'flagship.data.items.length') && this.flagship()}
                </Box>
                <Box className="home-section twoh my-2">
                    {dig(this.props.homePage, 'twoh.data') && dig(this.props.homePage, 'twoh.data.result.length') && this.twoh()}
                </Box>
                <Box className="home-section new-arrival my-2">
                    {dig(this.props.homePage, 'newArrival.data') && dig(this.props.homePage, 'newArrival.data.latest_trends.items.length') && this.newArrival()}
                </Box>
                <Box className="home-section hot-stuff my-2">
                    {
                        dig(this.props.homePage, 'newArrival.data.just_restocked.items.length') && dig(this.props.homePage, 'trending.data.items.length') &&
                            <Container className="home-section hot-stuff-content">
                                <Grid container={true} spacing={2}>
                                    {this.hotStuff('Back In Stock', 'We just cant get enough!', dig(this.props.homePage, 'newArrival.data.just_restocked.items'))}
                                    {this.hotStuff('Highly Rated', 'Popular beauty must-haves', dig(this.props.homePage, 'trending.data.items'))}
                                </Grid>
                            </Container>
                    }
                </Box>
                <Box className="home-section sponsored my-2" >
                    {dig(this.props.homePage, 'sponsored.data.result.items.length') && this.sponsor()}
                </Box>
                {/* <Box className="home-section extension my-2">
                    {dig(this.props.homePage, 'extension.data.items.length') && this.extension()}
                </Box> */}
                <Box className="home-section personalisation">
                    {dig(this.props.homePage, 'personalisation.data.data.product.items.length') && this.personalisation(this.props.homePage.personalisation.data.data)}
                </Box>
                <Box className="home-section review my-2">
                    {dig(this.props.homePage, 'review.data.result.items.length') && this.reviews()}
                </Box>
                <Hidden smDown={true}>
                    <Box className="home-footer pt-3" style={{ backgroundColor: '#222' }}>
                        {
                            dig(this.props.homePage, 'footerLayout.data.modules.length') && dig(this.props.homePage, 'footerImage.data.items.length') && dig(this.props.homePage, 'footerPartner.data.items.length') &&
                            this.homeFooter(this.props.homePage.footerLayout.data, this.props.homePage.footerImage.data, this.props.homePage.footerPartner.data)
                        }
                    </Box>
                </Hidden>
            </Box>
        </Box>
    );
}

HomePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
    withReducer,
    withSaga,
    withStyles(styles),
    withConnect,
)(HomePage);
