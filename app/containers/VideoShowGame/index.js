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

import Lottie from './../../assets/react-lottie';

import * as animationData from './2104-surprise.json';

import makeSelectVideoShowGame from './selectors';
import makeSelectGamesPage from '../GamesPage/selectors';
import reducer from './reducer';
import saga from './saga';
import {
    getGameToken,
} from '../GamesPage/actions';
import './style.scss';

const initialState = {
    lottieJson: null,
    shareModal: false,
    complete: null,
    gameAccessToken: null,
    gameResultImage: null,
};

export class VideoShowGame extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
        };
        this.state = {
            ...initialState,
            gameMusic: new Audio(this.props.gameConfig.background_music),
        };
        this.state.gameMusic.loop = true;
        this.props.dispatch(getGameToken());

        document.ondragstart = () => null;
        Events.trigger('hideHeader', {});

        // this.props.dispatch(getLottieJson({ url: 'https://firebasestorage.googleapis.com/v0/b/whenimeetu-backend.appspot.com/o/gallery%2F1573116287003_2104-surprise.json?alt=media&token=45f17ed7-be84-478c-930a-2383b4e7b3ca' }));
    }

    componentWillReceiveProps = (nextProps) => {
        if (dataChecking(nextProps, 'videoShowGame', 'lottieJson') !== dataChecking(this.props, 'videoShowGame', 'lottieJson') && nextProps.videoShowGame.lottieJson.success) {
            if (dataChecking(nextProps.videoShowGame.lottieJson, 'data')) {
                const lottieJson = nextProps.videoShowGame.lottieJson.data;
                this.setState({ lottieJson });
            }
        }

        if (dataChecking(nextProps, 'gamePage', 'gameToken', 'success') !== dataChecking(this.props, 'gamePage', 'gameToken', 'success') && nextProps.gamePage.gameToken.success) {
            this.setState({ gameAccessToken: nextProps.gamePage.gameToken.data.token });
            this.initialiseGame();
        }

        if (dataChecking(nextProps, 'gameResultImagelink') !== dataChecking(this.props, 'gameResultImagelink') && dataChecking(nextProps, 'gameResultImagelink', 'result', 'image', 'mobile')) {
            this.setState({ gameResultImage: nextProps.gameResultImagelink.result.image.mobile });
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
    }

    renderResult = () => (
        <div className="result-screen-content">
            <div className="prize-inner-section animated zoomIn">
                {
                    this.state.gameResultImage ?
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
                                } else {
                                    window.parent.postMessage(JSON.stringify(this.props.gameResultImagelink.result._weblink), 'http://hershop.hermo.my');
                                }
                            }}
                        >
                            <img
                                draggable="false"
                                width="100%"
                                key={1}
                                src={this.state.gameResultImage}
                                alt="result background"
                                className="result-image"
                            />
                        </div>
                        :
                        null
                }
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
                            this.props.dispatch(getGameToken());
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

    render = () => {
        if (false && !dataChecking(this.state.lottieJson, 'data')) {
            return <div>Loading...</div>;
        }

        return (
            <div className="video-game-container">
                {
                    this.state.complete ?
                        <div className="result-screen">
                            {this.renderResult()}
                        </div>
                        :
                        <div className="game-screen animated fadeIn">
                            <Lottie
                                options={{
                                    loop: false,
                                    autoplay: true,
                                    // animationData: this.state.lottieJson.data,
                                    animationData,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice',
                                    },
                                }}
                                speed={0.2}
                                height={400}
                                width={400}
                                isStopped={this.state.isStopped}
                                isPaused={this.state.isPaused}
                                eventListeners={[
                                    {
                                        eventName: 'complete',
                                        callback: () => {
                                            if (!this.state.complete) {
                                                this.setState({ complete: true });
                                            }
                                        },
                                    },
                                ]}
                            />
                        </div>
                }
            </div>
        );
    };
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
