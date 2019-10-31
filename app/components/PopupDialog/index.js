/**
*
* PopupDialog
*
*/

import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@material-ui/core';
import { Close, ArrowBack } from '@material-ui/icons';

class PopupDialog extends React.PureComponent {
    render() {
        const onCloseStyle = this.props.isBack ? { position: 'absolute', left: '0rem', top: '0.8rem' } : { position: 'absolute', right: '0rem', top: '0.8rem' };
        return (
            <div>
                <Dialog open={this.props.display} onClose={this.props.onClose} fullWidth={this.props.fullWidth} fullScreen={this.props.fullScreen}>
                    <DialogTitle id="alert-dialog-title">
                        <span>{this.props.title}</span>
                        {
                            this.props.onClose &&
                                <IconButton
                                    aria-label="Close"
                                    onClick={this.props.onClose}
                                    style={onCloseStyle}
                                >
                                    {
                                        this.props.isBack ?
                                            <ArrowBack />
                                            :
                                            <Close />
                                    }
                                </IconButton>
                        }
                    </DialogTitle>
                    <DialogContent>
                        {this.props.children}
                    </DialogContent>
                    <DialogActions>
                        {
                            this.props.onCancel &&
                                <Button onClick={this.props.onCancel} color="primary">
                                    Cancel
                                </Button>
                        }
                        {
                            this.props.onUpdate &&
                                <Button onClick={this.props.onUpdate} color="primary">
                                    Update
                                </Button>
                        }
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PopupDialog.propTypes = {

};

export default PopupDialog;
