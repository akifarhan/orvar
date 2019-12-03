/**
*
* HtmlParser
*
*/

import React from 'react';
import parse, { domToReact } from 'html-react-parser';

import './style.scss';

class HtmlParser extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        const tableStyle = {
            flex: 1,
            justifyContent: 'flex-start',
        };

        const thStyle = {
            ...tdStyle,
            backgroundColor: '#CCCCCC',
            alignItems: 'center',
        };

        const tColumnStyle = {
            ...tableStyle,
            flexDirection: 'column',
            alignItems: 'stretch',
        };

        const tRowStyle = {
            ...tableStyle,
            flexDirection: 'row',
            alignItems: 'stretch',
        };

        const tdStyle = {
            ...tableStyle,
            padding: 2,
        };

        const options = {
            replace: ({ name, attribs, children, parent }) => {
                if (name === 'img') {
                    return (
                        <img alt={attribs.alt} src={attribs.src} style={{ width: '100%', height: '100%' }} />
                    );
                }
                if (name === 'ul') {
                    return (
                        <ul style={{ display: 'list-item' }}>
                            {domToReact(children, options)}
                        </ul>
                    );
                }
                if (name === 'li') {
                    if (parent.name === 'ul') {
                        return (
                            <li style={{ display: 'list-item', listStyleType: 'disc' }}>
                                {domToReact(children, options)}
                            </li>
                        );
                    }
                    return null;
                }
                if (name === 'iframe') {
                    return (
                        <iframe
                            title="video"
                            align={attribs.align}
                            frameBorder={attribs.frameborder}
                            scrolling={attribs.scrolling}
                            src={attribs.src}
                            width="100%"
                        />
                    );
                }
                if (name === 'table') {
                    return (
                        <div style={tableStyle}>
                            {domToReact(children, options)}
                        </div>
                    );
                }
                if (name === 'tbody') {
                    return (
                        <div style={tColumnStyle}>
                            {domToReact(children, options)}
                        </div>
                    );
                }
                if (name === 'tr') {
                    return (
                        <div style={tRowStyle}>
                            {domToReact(children, options)}
                        </div>
                    );
                }
                if (name === 'td') {
                    return (
                        <div style={tdStyle}>
                            {domToReact(children, options)}
                        </div>
                    );
                }
                if (name === 'th') {
                    return (
                        <div style={thStyle}>
                            {domToReact(children, options)}
                        </div>
                    );
                }
                return null;
            },
        };

        return (
            parse(this.props.html, options)
        );
    }
}

HtmlParser.propTypes = {

};

export default HtmlParser;
