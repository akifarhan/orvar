/**
*
* AddressForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
    Select,
    Typography,
} from '@material-ui/core';
import InputForm from 'components/InputForm';

import './style.scss';

class AddressForm extends React.PureComponent {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="receiver_name"
                        handleChange={this.props.handleChange}
                        onClear={this.props.onClear}
                        label="Receiver name"
                        value={this.props.state.receiver_name}
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                <InputLabel className="text-capitalize pb-half">Address *</InputLabel>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="line_1"
                        handleChange={this.props.handleChange}
                        onClear={this.props.onClear}
                        value={this.props.state.line_1}
                        placeholder="e.g No 13 2nd Floor, Blok B"
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="line_2"
                        handleChange={this.props.handleChange}
                        onClear={this.props.onClear}
                        value={this.props.state.line_2}
                        placeholder="e.g High Noon Apartment"
                        required="false"
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="line_3"
                        handleChange={this.props.handleChange}
                        onClear={this.props.onClear}
                        value={this.props.state.line_3}
                        required="false"
                        placeholder="e.g Taman High Noon"
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="city"
                        label="City"
                        handleChange={this.props.handleChangeCity}
                        onClear={this.props.onClear}
                        value={this.props.state.city}
                        placeholder="e.g Johor Bahru"
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                <FormControl fullWidth={true}>
                    <InputForm
                        id="postal_code"
                        label="Postcode"
                        handleChange={this.props.handleChangePostCode}
                        onClear={this.props.onClear}
                        value={this.props.state.postal_code}
                        placeholder="e.g 81200"
                        defaultValue={this.props.defaultValue}
                    />
                </FormControl>
                <InputLabel className="text-capitalize pb-half">State *</InputLabel>
                <FormControl variant="outlined" fullWidth={true}>
                    <Select
                        native={true}
                        id="state_code"
                        label="State"
                        value={this.props.state.state_code}
                        onChange={this.props.handleChange}
                        input={
                            <OutlinedInput />
                        }
                        required={true}
                        defaultValue={this.props.defaultValue}
                    >
                        {this.props.statesList}
                    </Select>
                </FormControl>
                {
                    this.props.hideExtra ?
                        null
                        :
                        <Box>
                            <InputLabel className="text-capitalize pb-half">Phone no *</InputLabel>
                            <Grid container={true} direction="row" justify="space-around" align="stretch">
                                <Grid item={true} xs={3} md={2}>
                                    <FormControl variant="outlined" fullWidth={true}>
                                        <Select
                                            native={true}
                                            id="sms_prefix"
                                            value={this.props.state.sms_prefix}
                                            onChange={this.props.handleChange}
                                            input={
                                                <OutlinedInput />
                                            }
                                            required={true}
                                            defaultValue={this.props.defaultValue}
                                        >
                                            {this.props.smsPrefixList}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item={true} xs={9} md={10}>
                                    <FormControl fullWidth={true}>
                                        <InputForm
                                            id="sms_number"
                                            handleChange={this.props.handleChangeNumber}
                                            value={this.props.state.sms_number}
                                            placeholder="e.g. 7654321"
                                            onClear={this.props.onClear}
                                            defaultValue={this.props.defaultValue}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <FormControl fullWidth={true}>
                                <InputForm
                                    id="contact_number"
                                    label="Other no."
                                    handleChange={this.props.handleChangeNumber}
                                    onClear={this.props.onClear}
                                    value={this.props.state.contact_number}
                                    placeholder="Phone Number"
                                    defaultValue={this.props.defaultValue}
                                    required="false"
                                />
                            </FormControl>
                            <Grid container={true} justify="center" spacing={1}>
                                <Grid item={true}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        <Typography>Save</Typography>
                                    </Button>
                                </Grid>
                                <Grid item={true}>
                                    {this.props.editAddress ?
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                this.props.handleDelete();
                                            }}
                                        >
                                            <Typography>Delete</Typography>
                                        </Button>
                                        :
                                        null
                                    }
                                </Grid>
                            </Grid>
                        </Box>
                }
            </form>
        );
    }
}

AddressForm.propTypes = {
    hideExtra: PropTypes.bool, // Show lite address form
    handleSubmit: PropTypes.func, // Function for form submission
    handleChange: PropTypes.func, // Function for input value changes
    onClear: PropTypes.func, // Function for reset input value
    state: PropTypes.object,
    defaultValue: PropTypes.string,
    handleChangePostCode: PropTypes.func, // Function for postcode handling
    handleChangeNumber: PropTypes.func, // Function for number only
    handleDelete: PropTypes.func, // Function for delete the address from database
    statesList: PropTypes.array, // List of states
    smsPrefixList: PropTypes.array, // List of sms-prefix
};

export default AddressForm;
