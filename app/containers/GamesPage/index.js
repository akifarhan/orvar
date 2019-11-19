/**
 *
 * GamesPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking, Events, setCookie, dig } from 'globalUtils';
import globalScope from 'globalScope';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'assets/animate.min.scss';
import AuthPage from '../AuthPage';
import PerfectMatchGame from '../PerfectMatchGame';
import VideoShowGame from '../VideoShowGame';
import {
    getGameInfo,
    getResult,
    getMemberInfo,
} from './actions';
import makeSelectGamesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class GamesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showModal: null,
            slideArray: null,
            gameId: dataChecking(this.props, 'match', 'params', 'id'),
            loading: true,
            // gameId: 1,
            // showModal: 'showPlay',
            playMusic: false,
            showPassword: false,
            requestToken: false,
            pageFontSize: '13px',
            showUsername: false,
            gameInfo: null,
        };
    }

    componentDidMount = () => {
        document.ondragstart = () => null;
        Events.trigger('hideHeader', {});
        Events.trigger('hideFooter', {});
        setTimeout(() => {
            this.setState({ isRendered: true });
        }, 1100);
        if (window.takePocket) {
            this.handlePocket(window.takePocket());
        } else if (this.props.location.search.indexOf('pickPocket') !== -1) {
            if (window.addEventListener) {
                // For standards-compliant web browsers
                window.addEventListener('message', this.parsePocketFromWeb, false);
            } else {
                window.attachEvent('onmessage', this.parsePocketFromWeb);
            }
        } else if (!globalScope.token) {
            globalScope.previousPage = window.location.pathname;
            this.setState({ requestToken: true, loading: false });
        } else {
            this.setState({ requestToken: false, loading: false });
        }

        this.props.dispatch(getGameInfo({ id: this.state.gameId }));
        this.props.dispatch(getMemberInfo());
    }

    componentWillReceiveProps = (nextProps) => {
        if (dataChecking(nextProps, 'gamesPage', 'result') !== dataChecking(this.props, 'gamesPage', 'result') && nextProps.gamesPage.result.success) {
            this.setState({ gameResultImagelink: nextProps.gamesPage.result.data });
        }

        if (dataChecking(nextProps, 'gamesPage', 'gameInfo') !== dataChecking(this.props, 'gamesPage', 'gameInfo') && nextProps.gamesPage.gameInfo.success) {
            if (dataChecking(nextProps.gamesPage.gameInfo, 'data')) {
                const gameInfo = nextProps.gamesPage.gameInfo.data;
                this.setState({ gameInfo });

                if (dataChecking(gameInfo, 'data', 'config', 'menu', 'background_music')) {
                    this.idleMusic = new Audio(gameInfo.data.config.menu.background_music);
                    this.idleMusic.loop = true;
                }

                if (dataChecking(gameInfo, 'data', 'config', 'menu', 'start_sound')) {
                    this.startSound = new Audio(gameInfo.data.config.menu.start_sound);
                }
            }
        }

        if (dataChecking(nextProps, 'gamesPage', 'memberInfo') !== dataChecking(this.props, 'gamesPage', 'memberInfo') && nextProps.gamesPage.memberInfo.success) {
            const memberInfo = nextProps.gamesPage.memberInfo.data;
            this.setState({ memberInfo });
        }
    }

    onBgImageLoaded = ({ target: imageEl }) => {
        this.setState({
            // dimensions: {
            //     height: imageEl.offsetHeight,
            //     width: imageEl.offsetWidth,
            // },
            pageFontSize: `${imageEl.offsetWidth / 36}px`,
        });
    }

    onGameComplete = (payload) => {
        if (this.state.gameInfo.data.config.game.disableBackOnPlay && this.state.disableBack) {
            this.setState({ disableBack: false });
        }
        this.props.dispatch(getResult(payload));
    }

    onBackToMenu = () => {
        if (this.state.disableBack) {
            return null;
        }

        this.setState({ showModal: null });
        if (this.state.playMusic && this.state.showModal === 'showPlay' && this.idleMusic) {
            this.idleMusic.currentTime = 0;
            this.idleMusic.play();
        }

        return null;
    }

    onPlay = () => {
        const obj = {
            showModal: 'showPlay',
            gameResultImagelink: null,
            disableBack: this.state.gameInfo.data.config.game.disableBackOnPlay,
        };
        this.setState(obj);
    }

    parsePocketFromWeb = (event) => {
        if (event.origin !== 'https://www.hermo.my'
            && event.origin !== 'https://hermo.my'
            && event.origin !== 'https://devshop2.hermo.my'
            && event.origin !== 'http://hershop.hermo.my') {
            console.log(`Receive postMessage from invalid source: ${event.origin}`);
            return null;
        }
        if (event.data) {
            try {
                const pocket = JSON.parse(event.data);
                if (pocket.hertoken) {
                    this.handlePocket(pocket);
                    return pocket;
                } else if (globalScope.token) {
                    return (
                        this.setState({ loading: false, requestToken: false })
                    );
                }
                globalScope.previousPage = window.location.pathname;
                this.setState({ loading: false, requestToken: true });
            } catch (error) {
                console.log('Error happen when parsing pocket', error);
            }
        }
        globalScope.previousPage = window.location.pathname;
        this.setState({ loading: false, requestToken: true });

        return null;
    };

    handlePocket = (pocket) => {
        if (pocket.hertoken) {
            globalScope.profile = pocket;
            globalScope.token = pocket.hertoken;
            globalScope.axios.setHeader('hertoken', globalScope.token);
            setCookie(process.env.TOKEN_KEY, globalScope.token);
            this.setState({ loading: false });
        } else if (globalScope.token) {
            this.setState({ loading: false, requestToken: false });
        } else {
            globalScope.previousPage = window.location.pathname;
            this.setState({ requestToken: true, loading: false });
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };


    renderModalContent = () => {
        const { showModal, slideArray, gameId } = this.state;

        if (showModal === 'showPlay' && gameId) {
            if (gameId && dataChecking(this.state.gameInfo, 'data', 'type')) {
                if (this.idleMusic) {
                    this.idleMusic.pause();
                }

                switch (this.state.gameInfo.data.type) {
                    case 'mix-and-match':
                        return (
                            <PerfectMatchGame
                                props={{ smth: true }}
                                gameId={this.state.gameId}
                                playMusic={this.state.playMusic}
                                onGameStart={() => alert('gamestart')}
                                onGameWin={(payload) => this.onGameComplete(payload)}
                                onGameLose={(payload) => this.onGameComplete(payload)}
                                onBackToMenu={this.onBackToMenu}
                                gameResultImagelink={this.state.gameResultImagelink}
                                gameConfig={this.state.gameInfo.data.config.game}
                                onReplay={this.onPlay}
                            />
                        );
                    case 'video-show':
                        return (
                            <VideoShowGame
                                props={{ smth: true }}
                                gameId={this.state.gameId}
                                playMusic={this.state.playMusic}
                                onGameStart={() => alert('gamestart')}
                                onGameComplete={(payload) => this.onGameComplete(payload)}
                                onBackToMenu={this.onBackToMenu}
                                gameConfig={this.state.gameInfo.data.config.game}
                                gameResultImagelink={this.state.gameResultImagelink}
                                onReplay={this.onPlay}
                            />
                        );

                    default:
                        return (
                            <div>Invalid Game <span>{this.state.gameInfo.data.type}</span></div>
                        );
                }
            }
        }

        if (showModal === 'slideShow' && slideArray) {
            return (
                <div className="prize-inner-section">
                    <Carousel showThumbs={false} showStatus={false} showIndicators={slideArray.length > 1} emulateTouch={true}>
                        {
                            slideArray.map((item, index) => (
                                <img
                                    draggable="false"
                                    key={index}
                                    width="100%"
                                    src={item}
                                    alt="carousel slide show"
                                    className="slideshow-image"
                                />
                            ))
                        }
                    </Carousel>
                </div>
            );
        }

        return null;
    }

    render() {
        if (this.state.requestToken) {
            return (
                <div className="games-page" style={{ fontSize: this.state.pageFontSize }}>
                    <div className="game-container">
                        <div className="games-login-modal animated fa" style={{ backgroundColor: 'rgba(255,255,255)', overflow: 'auto' }}>
                            <AuthPage isModal={true} />
                        </div>
                    </div>
                </div>
            );
        }

        if (!dataChecking(this.state, 'gameInfo', 'data', 'config')) {
            return (
                <div className="page-loader">
                    <img className="username-loading" src={require('images/preloader-02.gif')} alt="" />
                </div>
            );
        } else if (!this.state.gameId) {
            return (
                <div>Invalid...</div>
            );
        }

        const gameData = this.state.gameInfo.data;

        return (
            <div className="games-page" style={{ fontSize: this.state.pageFontSize }}>
                <div className="game-container">
                    <div className="page-buttons">
                        {
                            this.state.showModal ?
                                <div
                                    className={`toggle-back page-button-item ${this.state.disableBack ? 'disabled' : ''}`}
                                    onClick={() => this.onBackToMenu()}
                                >
                                    <i
                                        className="fas fa-chevron-left main-menu-button-item animated zoomIn"
                                        style={{ color: gameData.config.game.text_color || 'black' }}
                                        draggable="false"
                                        alt="back"
                                    />
                                </div>
                                :
                                null
                        }
                        {
                             gameData.config.menu.background_music || gameData.config.game.background_music ?
                                <div
                                    className="toggle-music page-button-item to-right"
                                    onClick={() => {
                                        this.setState({ playMusic: !this.state.playMusic });
                                        if (this.idleMusic) {
                                            this.idleMusic[!this.state.playMusic ? 'play' : 'pause']();
                                        }
                                    }}
                                >
                                    {
                                        this.state.playMusic ?
                                            <i
                                                className="fas fa-volume-up main-menu-button-item animated zoomIn"
                                                style={{ color: gameData.config.game.text_color || 'black' }}
                                                draggable="false"
                                                alt="play"
                                            />
                                            :
                                            <i
                                                className="fas fa-volume-mute main-menu-button-item animated zoomIn"
                                                style={{ color: gameData.config.game.text_color || 'black' }}
                                                draggable="false"
                                                alt="play"
                                            />
                                    }
                                </div>
                                :
                                null
                        }
                    </div>
                    <div className="main-menu-wrapper">
                        <div className="main-menu-content">
                            <div className="main-menu-bottom-content animated fadeIn">
                                <div className="game-info" style={{ color: gameData.config.game.text_color || 'black' }}>
                                    <div className="main-menu-username">
                                        {
                                            dataChecking(globalScope, 'profile', 'name') && dataChecking(globalScope, 'profile', 'username') ?
                                                <div className="profile-name animated fadeIn">Welcome, {globalScope.profile.name || globalScope.profile.username}!</div>
                                                :
                                                <img className="username-loading" src={require('images/preloader-02.gif')} alt="" />
                                        }
                                    </div>
                                </div>
                                <div
                                    onClick={
                                        () => {
                                            if (this.state.playMusic) {
                                                this.startSound.play();
                                            }
                                            setTimeout(() => {
                                                this.onPlay();
                                            }, 0);

                                            return true;
                                        }
                                    }
                                    className="animated fadeIn"
                                >
                                    <img
                                        draggable="false"
                                        src={gameData.config.menu.start_button}
                                        alt="Play"
                                        className="main-menu-button-item"
                                    />
                                </div>
                                <div
                                    onClick={() => this.setState({ showModal: 'slideShow', slideArray: gameData.config.menu.prize_slider })}
                                    className="animated fadeIn"
                                >
                                    <img
                                        draggable="false"
                                        src={gameData.config.menu.prizes_button}
                                        alt="Prizes"
                                        className="main-menu-button-item"
                                    />
                                </div>
                                <div
                                    onClick={() => this.setState({ showModal: 'slideShow', slideArray: gameData.config.menu.how_to_play_slider })}
                                    className="animated fadeIn"
                                >
                                    <img
                                        draggable="false"
                                        src={gameData.config.menu.how_to_play_button}
                                        alt="How to Play"
                                        className="main-menu-button-item"
                                    />
                                </div>
                            </div>
                            {
                                gameData.token_charge ?
                                    <div
                                        className="main-menu-token-indicator"
                                        style={{ color: gameData.config.game.text_color || 'black' }}
                                    >
                                        <span>Token available: </span>
                                        {
                                            this.state.memberInfo ?
                                                <span>{dig(this.state.memberInfo, 'data.token.amount') || 0}</span>
                                                :
                                                <img className="available-token-loading" src={require('images/preloader-02.gif')} alt="" />
                                        }
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <div
                        className="ppg-version"
                        onClick={() => {
                            // alert(`${window.parent ? 'have window.parent' : 'no window.parent'}`);
                            // // alert(`${window.parent && window.parent.onPerfectGame ? 'have window.parent.onPerfectGame' : 'no window.parent.onPerfectGame'}`);
                            // if (window.parent && window.parent.onPerfectGame) {
                            //     window.parent.onPerfectGame();
                            // }

                            // if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                            //     window.ReactNativeWebView.postMessage('adasdadasd', 'applink');

                            //     if (window.onCloseWindow) {
                            //         window.onCloseWindow();
                            //     }
                            // }
                        }}
                    >1.0.1</div>
                    <img
                        draggable="false"
                        onLoad={this.onBgImageLoaded}
                        src={gameData.config.menu.background_image}
                        alt="main menu background"
                        className="main-menu-bg animated fadeIn"
                    />
                    {
                        this.state.loading ?
                            <div className="token-loading">
                                <div>
                                    <img className="token-loading-gif" src={require('images/preloader-02.gif')} alt="loading" />
                                </div>
                            </div>
                            :
                            null
                    }
                    {
                        this.state.showModal ?
                            <div
                                className={`games-page-popup-modal modal-${this.state.showModal} animated ${this.state.isRendered ? 'fadeIn' : 'opacity-zero'}`}
                            >
                                <div className="modal-inner-div">
                                    {this.renderModalContent(this.state.slideArray)}
                                </div>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

GamesPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    gamesPage: makeSelectGamesPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'gamesPage', reducer });
const withSaga = injectSaga({ key: 'gamesPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(GamesPage);
