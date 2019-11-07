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
} from 'globalUtils';

import Lottie from 'react-lottie';

import * as animationData from './2104-surprise.json';

import makeSelectVideoShowGame from './selectors';
import reducer from './reducer';
import saga from './saga';
// import { getLottieJson } from './actions';
import './style.scss';

export class VideoShowGame extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            lottieJson: null,
        };

        // this.props.dispatch(getLottieJson({ url: 'https://firebasestorage.googleapis.com/v0/b/whenimeetu-backend.appspot.com/o/gallery%2F1573116287003_2104-surprise.json?alt=media&token=45f17ed7-be84-478c-930a-2383b4e7b3ca' }));
    }

    componentWillReceiveProps = (nextProps) => {
        if (dataChecking(nextProps, 'videoShowGame', 'lottieJson') !== dataChecking(this.props, 'videoShowGame', 'lottieJson') && nextProps.videoShowGame.lottieJson.success) {
            if (dataChecking(nextProps.videoShowGame.lottieJson, 'data')) {
                const lottieJson = nextProps.videoShowGame.lottieJson.data;
                this.setState({ lottieJson });
            }
        }
    }

    render = () => {
        if (false && !dataChecking(this.state.lottieJson, 'data')) {
            return <div>Loading...</div>;
        }

        return (
            <div>
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
                    height={400}
                    width={400}
                    isStopped={this.state.isStopped}
                    isPaused={this.state.isPaused}
                />
            </div>
        );
    };
}

VideoShowGame.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    videoShowGame: makeSelectVideoShowGame(),
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
