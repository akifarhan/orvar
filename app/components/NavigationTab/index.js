/**
*
* NavigationTab
*
*/

import React from 'react';
import {
    AppBar,
    Container,
    Hidden,
    IconButton,
    Tab,
    Tabs,
} from '@material-ui/core';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

import './style.scss';

class NavigationTab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = { value: 0 };
    }

    renderTabID = (event, value) => {
        this.setState({ value });
        this.props.data.map((data) => {
            if (data.url) {
                this.setState({ url: data.url });
            }
            return null;
        });
        this.props.renderTabID(value);
    };
    render() {
        return (
            <div>
                <AppBar position="static" color="default">
                    <Container>
                        <Hidden xsDown={true}>
                            <NavLink to="/profile" style={{ 'float': 'left' }}>
                                <IconButton className="pt-1">
                                    <KeyboardArrowLeft />
                                </IconButton>
                            </NavLink>
                        </Hidden>
                        <Tabs
                            value={this.state.value}
                            onChange={(event, value) => this.renderTabID(event, value)}
                            variant="scrollable"
                            scrollButtons="on"
                        >
                            {
                                this.props.data.map((data) => (
                                    <Tab
                                        className="text-capitalize"
                                        key={data.title}
                                        label={data.title}
                                        onClick={() => {
                                            if (this.props.onTabClick) {
                                                this.props.onTabClick(data);
                                            }
                                        }}
                                    />
                                ))
                            }
                        </Tabs>
                    </Container>
                </AppBar>
            </div>
        );
    }
}

NavigationTab.propTypes = {

};

export default NavigationTab;
