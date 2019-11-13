/**
*
* PopupDialog
*
*/

import React from 'react';

import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@material-ui/core';
import { Close, ArrowBack } from '@material-ui/icons';

class PopupDialog extends React.PureComponent {
    render() {
        const onCloseStyle = this.props.isBack ? { position: 'absolute', left: '0rem', top: '0.8rem', zIndex: '1001' } : { position: 'absolute', right: '0rem', top: '0.8rem', zIndex: '1001' };
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
                    {
                        this.props.onCancel &&
                            <Button
                                onClick={this.props.onCancel}
                                color="primary"
                                style={{ borderRadius: 2, height: '3.5rem' }}
                                fullWidth={true}
                            >
                                Cancel
                            </Button>
                    }
                    {
                        this.props.onSubmit &&
                            <Button
                                variant="contained"
                                disabled={!this.props.isComplete}
                                color={this.props.isComplete ? 'secondary' : 'default'}
                                style={{ borderRadius: 2, height: '3.5rem' }}
                                fullWidth={true}
                                onClick={this.props.onSubmit}
                            >
                                Submit
                            </Button>
                    }
                </Dialog>
            </div>
        );
    }
}

PopupDialog.propTypes = {

};

export default PopupDialog;
