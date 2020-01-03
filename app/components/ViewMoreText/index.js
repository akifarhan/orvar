/**
*
* ViewMoreText
*
*/

import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

// import styled from 'styled-components';
import PropTypes from 'prop-types';
import './style.scss';
const ELLIPSES = '. . .';
const SHOW_LESS_TEXT = 'See Less';
const SHOW_MORE_TEXT = 'See More';

class ViewMoreText extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    static defaultProps = {
        // numberOfLines: 1,
        // lineHeight: 1,
        readMoreCharacterLimit: 100,
        showLessButton: true,
    }
    state = {
        showingAll: false,
    }
    getActionButton = ({ text, readMoreCharacterLimit, showingAll, showLessButton }) => {
        const buttonText = showingAll ? SHOW_LESS_TEXT : SHOW_MORE_TEXT;

        if (text.length < readMoreCharacterLimit) {
            return null;
        }

        if (showingAll && !showLessButton) {
            return null;
        }

        return (
            <ButtonBase
                className="read-more-toggle"
                onClick={this.toggleReadMore}
            >
                <Typography color="secondary"><u>{buttonText}</u></Typography>
            </ButtonBase>
        );
    }

    getText = ({ showingAll, text, readMoreCharacterLimit }) => {
        const { teaserText, remainingText } = this._getReadMoreParts({ text, readMoreCharacterLimit });

        if (!showingAll && text.length > readMoreCharacterLimit) {
            return (
                <span>
                    {teaserText.replace(/\s*$/, '')} {ELLIPSES}
                </span>
            );
        }

        return (
            <span>
                {teaserText}
                <span>
                    {remainingText}
                </span>
            </span>
        );
    }

    toggleReadMore = () => {
        this.setState({
            showingAll: !this.state.showingAll,
        });
    }

    _getReadMoreParts = ({ text, readMoreCharacterLimit }) => {
        let teaserText;
        let remainingText;
        const remainingWordsArray = [];

        if (text) {
            const teaserWordsArray = text.split(' ');

            while (teaserWordsArray.join(' ').length > readMoreCharacterLimit) {
                remainingWordsArray.unshift(teaserWordsArray.pop());
            }

            teaserText = teaserWordsArray.join(' ');

            if (remainingWordsArray.length > 0) {
                remainingText = remainingWordsArray.join(' ');
            }
        }

        return { teaserText, remainingText };
    }

    render() {
        const {
            text,
            readMoreCharacterLimit,
            showLessButton,
            // numberOfLines,
            // lineHeight,
        } = this.props;

        // const maxHeight = numberOfLines * lineHeight;
        const style = {
            // lineHeight: `${lineHeight}`,
            // maxHeight: `${maxHeight}rem`,
        };
        const { showingAll } = this.state;
        const textToDisplay = this.getText({ showingAll, text, readMoreCharacterLimit });
        const actionButton = this.getActionButton({ text, readMoreCharacterLimit, showingAll, showLessButton });

        return (
            <div className="read-more" style={style}>
                {textToDisplay}<br />{this.props.hideButton ? null : actionButton}
            </div>
        );
    }
}

ViewMoreText.propTypes = {
    readMoreCharacterLimit: PropTypes.number,
    hideButton: PropTypes.bool,
    showLessButton: PropTypes.bool,
    text: PropTypes.string,
};

export default ViewMoreText;
