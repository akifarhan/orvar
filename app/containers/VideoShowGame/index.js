/**
 *
 * VideoShowGame
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
    dataChecking,
    Events,
} from 'globalUtils';
import {
    IconButton,
} from '@material-ui/core';
import {
    Close,
} from '@material-ui/icons';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    TelegramShareButton,
    TelegramIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'react-share';

import Lottie from 'react-lottie';

// import * as animationData from './jetshow.json';
// import * as animationData from './2104-surprise.json';

import makeSelectVideoShowGame from './selectors';
import makeSelectGamesPage from '../GamesPage/selectors';
import reducer from './reducer';
import saga from './saga';
import {
    getLottieJson,
} from './actions';
import {
    getGameToken,
} from '../GamesPage/actions';
import './style.scss';

const shareUrl = 'https://app.hermo.my/PIyrPGmaI1';
const shareTitle = '';
const shareHashtag = '#HERMOchristmas2019';
const shareVia = '';

const initialState = {
    shareModal: false,
    complete: null,
    gameAccessToken: null,
    gameResultImage: null,
};

export class VideoShowGame extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            ...initialState,
            lottieJson: initialState.lottieJson || null,
            gameMusic: this.props.gameConfig.background_music ? new Audio(this.props.gameConfig.background_music) : null,
        };
        if (this.state.gameMusic) {
            this.state.gameMusic.loop = true;
        }

        this.props.dispatch(getGameToken({ id: this.props.gameId }));

        document.ondragstart = () => null;
        Events.trigger('hideHeader', {});

        if (this.props.gameConfig.json) {
            this.props.dispatch(getLottieJson({ url: this.props.gameConfig.json }));
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (dataChecking(nextProps, 'gamePage', 'gameToken', 'success') !== dataChecking(this.props, 'gamePage', 'gameToken', 'success') && nextProps.gamePage.gameToken.success) {
            this.setState({ gameAccessToken: dataChecking(nextProps.gamePage, 'gameToken', 'data', 'data', 'message', 'token') });
            this.initialiseGame();
        }

        if (dataChecking(nextProps, 'gameResultImagelink') !== dataChecking(this.props, 'gameResultImagelink') && dataChecking(nextProps, 'gameResultImagelink', 'data', 'message')) {
            this.setState({ gameResultImage: nextProps.gameResultImagelink.data.message.image });
        }

        if (dataChecking(nextProps, 'videoShowGame', 'lottieJson') !== dataChecking(this.props, 'videoShowGame', 'lottieJson') && nextProps.videoShowGame.lottieJson.success) {
            if (dataChecking(nextProps.videoShowGame.lottieJson, 'data')) {
                const lottieJson = nextProps.videoShowGame.lottieJson.data;
                this.setState({ lottieJson });
            }
        }
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps.playMusic !== this.props.playMusic && this.state.gameMusic) {
            this.state.gameMusic[nextProps.playMusic ? 'play' : 'pause']();
        }
    }

    componentWillUnmount() {
        if (this.state.gameMusic) {
            this.state.gameMusic.pause();
        }
    }

    initialiseGame = () => {
        if (this.props.playMusic && this.state.gameMusic) {
            this.state.gameMusic.play();
        }

        if (this.props.gameConfig.duration) {
            setTimeout(() => {
                if (!this.state.complete) {
                    this.setState({ complete: true });
                    this.props.onGameComplete({
                        score: null,
                        game_setup_id: this.props.gameId,
                        token: this.state.gameAccessToken,
                    });
                }
            }, this.props.gameConfig.duration);
        }
    }

    renderResult = () => (
        <div className={`result-screen-content animated ${this.state.complete ? 'fadeIn' : 'opacity-zero'}`}>
            <div className="prize-inner-section">
                <div
                    onClick={() => {
                        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                            if (window.onCloseWindow) {
                                window.onCloseWindow();
                            }
                            const link = {
                                key: '_appLink',
                                value: this.props.gameResultImagelink.result._applink,
                            };
                            const str = JSON.stringify(link);
                            window.ReactNativeWebView.postMessage(str);
                        } else if (dataChecking(this.props.gameResultImagelink, 'result', '_weblink')) {
                            window.parent.postMessage(JSON.stringify(this.props.gameResultImagelink.result._weblink), 'https://www.hermo.my');
                        }
                    }}
                >
                    <img
                        draggable="false"
                        width="100%"
                        key={1}
                        src={this.state.gameResultImage}
                        alt=""
                        className="result-image"
                    />
                </div>
                <span className="result-bottom-content">
                    <div
                        className="menu result-content"
                        onClick={this.props.onBackToMenu}
                    >
                        <img
                            className="result-button-item animated zoomIn"
                            draggable="false"
                            src={this.props.gameConfig.result_actions.menu_button}
                            alt="menu button"
                        />
                    </div>
                    <div
                        className="share result-content"
                        onClick={() => {
                            if (window.takePocket) {
                                const link = {
                                    key: 'share',
                                    value: {
                                        shareUrl,
                                        shareTitle,
                                        shareHashtag,
                                        shareVia,
                                    },
                                };
                                const str = JSON.stringify(link);
                                window.ReactNativeWebView.postMessage(str);
                            } else {
                                this.setState({ shareModal: true });
                            }
                        }}
                    >
                        <img
                            className="result-button-item animated zoomIn"
                            draggable="false"
                            src={this.props.gameConfig.result_actions.share_button}
                            alt="share button"
                        />
                    </div>
                    <div
                        className="replay result-content"
                        onClick={() => {
                            if (this.props.onReplay) {
                                this.props.onReplay();
                            }

                            this.props.dispatch(getGameToken({ id: this.props.gameId }));
                            setTimeout(() => {
                                this.setState({
                                    ...initialState,
                                });
                            }, 0);
                        }}
                    >
                        <img
                            className="result-button-item animated zoomIn"
                            draggable="false"
                            src={this.props.gameConfig.result_actions.replay_button}
                            alt="replay button"
                        />
                    </div>
                </span>
            </div>
        </div>
    )

    renderGame = () => {
        if (this.state.complete) {
            return null;
        }

        return (
            <div className="game-screen">
                <div className="game-running-overlay" />
                {
                    this.props.gameConfig.json ?
                        <div className="animated fadeIn">
                            <Lottie
                                className="lottie-video"
                                options={{
                                    loop: false,
                                    autoplay: true,
                                    // animationData: this.state.lottieJson.data,
                                    animationData: this.state.lottieJson,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice',
                                    },
                                }}
                                // speed={6}
                                height="100%"
                                width="100%"
                                isStopped={false}
                                isPaused={false}
                                onClick={() => { console.log('asdfads'); }}
                                eventListeners={[
                                    {
                                        eventName: 'complete',
                                        callback: () => {
                                            if (!this.state.complete) {
                                                this.setState({ complete: true });
                                                this.props.onGameComplete({
                                                    score: null,
                                                    game_setup_id: this.props.gameId,
                                                    token: this.state.gameAccessToken,
                                                });
                                            }
                                        },
                                    },
                                ]}
                            />
                        </div>
                        :
                        <div>render video</div>
                }
            </div>
        );
    }

    renderShareDialogContent = () => (
        <div>
            <div className="share-dialog-title">
                Share to others!
            </div>
            <span className="share-dialog-content">
                <div className="facebook share-content">
                    <FacebookShareButton
                        className="facebook share-button-item"
                        url={shareUrl}
                        quote={shareTitle}
                        hashtag={shareHashtag}
                    >
                        <FacebookIcon round={true} />
                    </FacebookShareButton>
                </div>
                <div className="twitter share-content">
                    <TwitterShareButton
                        className="twitter share-button-item"
                        url={shareUrl}
                        title={shareTitle}
                        via={shareVia}
                        hashtag={shareHashtag}
                    >
                        <TwitterIcon round={true} />
                    </TwitterShareButton>
                </div>
                <div className="telegram share-content">
                    <TelegramShareButton
                        className="telegram share-button-item"
                        url={shareUrl}
                        title={shareTitle}
                    >
                        <TelegramIcon round={true} />
                    </TelegramShareButton>
                </div>
                <div className="whatsapp share-content">
                    <WhatsappShareButton
                        className="whatsapp share-button-item"
                        url={shareUrl}
                        title={shareTitle}
                        separator="\n"
                    >
                        <WhatsappIcon round={true} />
                    </WhatsappShareButton>
                </div>
            </span>
        </div>
    )

    render = () => (
        <div className="video-game-container" style={{ backgroundImage: `url(${this.props.gameConfig.background_image})` || '' }}>
            {
                dataChecking(this.props, 'gamePage', 'gameToken', 'loading') ?
                    <img className="video-show-loading" src={require('images/preloader-02.gif')} alt="" />
                    :
                    this.renderGame()
            }
            {this.renderResult()}
            {
                this.state.shareModal ?
                    <div className="video-show-modal">
                        <div className="modal-inner-div">
                            <IconButton className="close modal-inner-button" onClick={() => this.setState({ shareModal: false })}>
                                <Close />
                            </IconButton>
                            {this.renderShareDialogContent()}
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    );
}

VideoShowGame.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    videoShowGame: makeSelectVideoShowGame(),
    gamePage: makeSelectGamesPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'videoShowGame', reducer });
const withSaga = injectSaga({ key: 'videoShowGame', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(VideoShowGame);
