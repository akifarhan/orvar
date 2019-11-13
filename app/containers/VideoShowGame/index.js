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
            gameMusic: new Audio(this.props.gameConfig.background_music),
        };
        this.state.gameMusic.loop = true;

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
        if (nextProps.playMusic !== this.props.playMusic) {
            this.state.gameMusic[nextProps.playMusic ? 'play' : 'pause']();
        }
    }

    componentWillUnmount() {
        this.state.gameMusic.pause();
    }

    initialiseGame = () => {
        if (this.props.playMusic) {
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
                            window.parent.postMessage(JSON.stringify(this.props.gameResultImagelink.result._weblink), 'http://hershop.hermo.my');
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
                                    value: dataChecking(this.props, 'gameResultImagelink', 'share'),
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
                            this.setState({
                                ...initialState,
                            });
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

    render = () => (
        <div className="video-game-container" style={{ backgroundImage: `url(${this.props.gameConfig.background_image})` || '' }}>
            {
                this.state.complete ?
                    null
                    :
                    <div className="game-screen">
                        {
                            this.props.gameConfig.json ?
                                <div className="animated fadeIn"><Lottie
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
                                    isStopped={this.state.isStopped}
                                    isPaused={this.state.isPaused}
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
            }
            {this.renderResult()}
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
