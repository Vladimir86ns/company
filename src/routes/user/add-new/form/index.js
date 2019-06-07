/**
 * Material Text Field
 */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { isEmpty } from 'Util/lodashFunctions';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Button } from 'reactstrap';
import FormErrorMessage from '../../../../components/Form/FormErrorMessage';

// redux action
import {
    getUserByIdAndAccountId,
    updateUser,
    updateUserFailureRestart
} from 'Actions/index';

const RESET_TIME_VALIDATION_MESSAGE = 5000;
class UserInformationForm extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        email: '',
        country: '',
        city: '',
        address: '',
        phone_number: '',
        mobile_phone: ''
    };

    /**
     * Handle change on form and update the store.
     */
    handleChange = name => event => {
        this.setState({
        [name]: event.target.value,
        });
    };

    componentDidMount() {
        this.getUserInfo();
    }

    componentWillUpdate(nextProps) {
        if (isEmpty(this.props.user) && !isEmpty(nextProps.user)) {
        this.getUserInfoToState(nextProps.user);
        }
    }

    /**
     * If user object is empty, send request to get user info.
     */
    getUserInfo() {
        let { user } = this.props
        if (isEmpty(user)) {
            this.props.getUserByIdAndAccountId();
        } else {
            this.getUserInfoToState(user);
        }
    }

    /**
     * Update state with user info.
     *
     */
    getUserInfoToState(user) {
        var newState = {...this.state};

        Object.keys(user).forEach((key) => {
            if (this.state[key] !== 'undefined') {
                newState[key] = user[key] ? user[key] : '';
            }
        });
        this.setState(newState);
    }

    /**
     * Submit the form.
     */
    onSubmit() {
        // TODO add validations, before update
        this.props.updateUser(this.state);
    };

    /**
     * Check if has error message, and reset.
     * 
     * @param {object} prevProps 
     */
    componentDidUpdate(prevProps) {
        if (prevProps.errorMessages !== this.props.errorMessages) {
            this.setTimeToRemoveErrorMessage(RESET_TIME_VALIDATION_MESSAGE);
        }
    };

    /**
     * Set time to remove validation messages.
    */
    setTimeToRemoveErrorMessage(time) {
        setTimeout(() => {
            this.props.updateUserFailureRestart();
        }, time);
    }

    render() {
        let { errorMessages } = this.props;

        return (
        <div className="textfields-wrapper">
            <RctCollapsibleCard heading={<IntlMessages id={'form.user.header'} />}>
                <form noValidate autoComplete="off">
                    <div className="row">
                    <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                            <TextField id="first_name" fullWidth label={<IntlMessages id={'form.user.first_name'} />} value={this.state.first_name} onChange={this.handleChange('first_name')} />
                            <FormErrorMessage message={errorMessages.first_name} />
                        </div>
                        <div className="form-group">
                            <TextField id="address" fullWidth label={<IntlMessages id={'form.user.address'} />} value={this.state.address} onChange={this.handleChange('address')} />
                            <FormErrorMessage message={errorMessages.address} />
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                            <TextField id="last_name" fullWidth label={<IntlMessages id={'form.user.last_name'} />} value={this.state.last_name} onChange={this.handleChange('last_name')} />
                            <FormErrorMessage message={errorMessages.last_name} />
                        </div>
                        <div className="form-group">
                            <TextField id="phone_number" fullWidth label={<IntlMessages id={'form.user.phone_number'} />} value={this.state.phone_number} onChange={this.handleChange('phone_number')} />
                            <FormErrorMessage message={errorMessages.phone_number} />
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                            <TextField id="country" fullWidth label={<IntlMessages id={'form.user.country'} />} value={this.state.country} onChange={this.handleChange('country')} />
                            <FormErrorMessage message={errorMessages.country} />
                        </div>
                        <div className="form-group">
                            <TextField id="mobile_phone" fullWidth label={<IntlMessages id={'form.user.mobile_phone'} />} value={this.state.mobile_phone} onChange={this.handleChange('mobile_phone')} />
                            <FormErrorMessage message={errorMessages.mobile_phone} />
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-xl-3">
                        <div className="form-group">
                            <TextField id="city" fullWidth label={<IntlMessages id={'form.user.city'} />} value={this.state.city} onChange={this.handleChange('city')} />
                            <FormErrorMessage message={errorMessages.city} />
                        </div>
                        <div className="form-group">
                            <TextField id="email" fullWidth label={<IntlMessages id={'form.user.email'} />} value={this.state.email} onChange={this.handleChange('email')} />
                            <FormErrorMessage message={errorMessages.email} />
                        </div>
                    </div>
                    </div>
                    <Button onClick={ () => this.onSubmit()} className="mr-10 mb-10" color="primary">Submit</Button>
                </form>
            </RctCollapsibleCard>
        </div>
        );
    }
}

function mapStateToProps({ userReducer }) {
    const { user, errorMessages } = userReducer;
    return { user, errorMessages }
}

export default connect(mapStateToProps, {
    getUserByIdAndAccountId,
    updateUser,
    updateUserFailureRestart
})(UserInformationForm)

