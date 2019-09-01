import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Button } from 'reactstrap';
import { isEmpty, clone } from '../../../../util/lodashFunctions';
import { NotificationManager } from 'react-notifications';
import { setUpValidationMessageLanguage, getValidationMessage, getOnlyUpdatedValues } from 'Util/helper';
import FormErrorMessage from 'Components/Form/FormErrorMessage';
import APP_MESSAGES from 'Constants/AppMessages';

// redux action
import {
    createCompany,
    updateCompany,
    updateCreateCompanyFailureRestart,
    getCompanyByIdAndAccountId,
    getUserByIdAndAccountId,
} from 'Actions/index';

const RESET_TIME_VALIDATION_MESSAGE = 5000;

class CompanyInformationForm extends React.Component {

    state = {
        name: '',
        address: '',
        country: '',
        city: '',
        mobile_phone: '',
        phone_number: '',
        employee_id_prefix: ''
    };

    componentWillMount() {
        let {company , user} = this.props;

        if (isEmpty(company) && user.company_settings_done) {
            this.props.getCompanyByIdAndAccountId();
        } else {
            this.updateStateWithCompanyInfo(company);
        }

        if (this.props.locale) {
            this.validator = setUpValidationMessageLanguage(this.props.locale.locale);
        }
    };

    componentWillUpdate(nextProps) {
        if (isEmpty(this.props.company) && !isEmpty(nextProps.company)) {
            this.updateStateWithCompanyInfo(nextProps.company);
            this.getUserIfCompanySettingsIsFalse();
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.errorMessages !== this.props.errorMessages) {
            this.setTimeToRemoveErrorMessage(RESET_TIME_VALIDATION_MESSAGE);
        }
    };

    /**
     * Get user information from server, if new company is created.
     */
    getUserIfCompanySettingsIsFalse() {
        if (this.props.user.company_settings_done) {
            return;
        }

        this.props.getUserByIdAndAccountId();
    }

    /**
     * Update the state.
     */
    handleChange = (key) => event => {
        this.setState({
            [key]: event.target.value,
        });
    };

    /**
     * Create new company, or update.
     * On update, update only changed values;
     */
    handleCreateOrUpdate() {
        if (this.validator.allValid()) {
            return this.validationPass();
        } else {
            NotificationManager.error(APP_MESSAGES.error.validationMessage);
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    /**
     * Get prefix for employee based on company name.
     */
    createRecommendedEmployeeID(companyName) {
        return companyName.match(/\b(\w)/g).join('');
    }

    /**
     * Update or create company, if validation pass.
     */
    validationPass() {
        let { user, company} =  this.props;

        if (!user.company_settings_done) {
            let companyInfo = clone(this.state);
            companyInfo.employee_id_prefix = this.createRecommendedEmployeeID(this.state.name);
            this.props.createCompany(companyInfo);

            return;
        }

        let updatedValues = getOnlyUpdatedValues(company, this.state);

        if (isEmpty(updatedValues)) {
            return NotificationManager.error(<IntlMessages id={'form.general.error.nothing_changed'} />);
        }

        this.props.updateCompany(updatedValues);
    }

    /**
     * Update state with company info.
     *
     */
    updateStateWithCompanyInfo(company) {
        var newState = {...this.state};

        Object.keys(company).forEach((key) => {
            if (typeof this.state[key] !== 'undefined') {
                newState[key] = company[key] ? company[key] : '';
            }
        });

        this.setState(newState);
    };

    /**
     * Set time to remove validation messages.
    */
    setTimeToRemoveErrorMessage(time) {
        setTimeout(() => {
            this.props.updateCreateCompanyFailureRestart();
        }, time);
    };

    /**
     * Get validation message.
     * 
     * @param {string} field 
     * @param {string} validationRule 
     */
    getValidationMessage(field, validationRule) {
        return getValidationMessage(field, validationRule, this.state[field], this.validator);
    };

    /**
     * Get employee prefix field, if company already exist.
     * 
     * @param {Object} errorMessages 
     */
    getEmployeeIdPrefix(errorMessages) {
        if (!this.props.user.company_settings_done) {
            return (<div></div>);
        }

        return (
            <div className="col-sm-6 col-md-6 col-xl-3">
                <div className="form-group">
                    <TextField id="employee_id_prefix" fullWidth label={<IntlMessages id={'form.company.employee_id_prefix'} />} value={this.state.employee_id_prefix} onChange={this.handleChange('employee_id_prefix')} autoComplete="off"/>
                    <FormErrorMessage message={errorMessages ? errorMessages.employee_id_prefix : ''} />
                    { this.getValidationMessage('employee_id_prefix', 'max:20') }
                </div>
            </div>
        );
    }

    render() {
        let { errorMessages } = this.props;

        return (
        <div className="textfields-wrapper">
            <RctCollapsibleCard heading={<IntlMessages id={'form.company.header'} />}>
            <form noValidate autoComplete="off">
                <div className="row">
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                        <TextField id="name" fullWidth label={<IntlMessages id={'form.company.name'} />} value={this.state.name} onChange={this.handleChange('name')} autoComplete="off"/>
                        <FormErrorMessage message={errorMessages.name} />
                        { this.getValidationMessage('name', 'required|min:1|max:100') }
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                        <TextField id="country" fullWidth label={<IntlMessages id={'form.company.country'} />} value={this.state.country} onChange={this.handleChange('country')} autoComplete="off"/>
                        <FormErrorMessage message={errorMessages.country} />
                        { this.getValidationMessage('country', 'min:3|max:100') }
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                        <TextField id="city" fullWidth label={<IntlMessages id={'form.company.city'} />} value={this.state.city} onChange={this.handleChange('city')} autoComplete="off"/>
                        <FormErrorMessage message={errorMessages.city} />
                        { this.getValidationMessage('city', 'min:3|max:100') }
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                        <TextField id="address" fullWidth label={<IntlMessages id={'form.company.address'} />} value={this.state.address} onChange={this.handleChange('address')} autoComplete="off"/>
                        <FormErrorMessage message={errorMessages.address} />
                        { this.getValidationMessage('address', 'max:100') }
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                        <TextField id="phone_number" fullWidth label={<IntlMessages id={'form.company.phone_number'} />} value={this.state.phone_number} onChange={this.handleChange('phone_number')} autoComplete="off"/>
                        <FormErrorMessage message={errorMessages.phone_number} />
                        { this.getValidationMessage('phone_number', 'min:3|max:100') }
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                        <TextField id="mobile_phone" fullWidth label={<IntlMessages id={'form.company.mobile_phone'} />} value={this.state.mobile_phone} onChange={this.handleChange('mobile_phone')} autoComplete="off"/>
                        <FormErrorMessage message={errorMessages.mobile_phone} />
                        { this.getValidationMessage('mobile_phone', 'min:3|max:100') }
                    </div>
                </div>
                {this.getEmployeeIdPrefix()}
                </div>
                <Button onClick={ () => this.handleCreateOrUpdate()} className="mr-10 mb-10" color="primary">{ this.props.user.company_settings_done ? 'Update' : 'Create'}</Button>
            </form>
            </RctCollapsibleCard>
        </div>
        );
    }
}

function mapStateToProps({ companyReducer, userReducer, settings }) {
    const { company, errorMessages } = companyReducer;
    const { user } = userReducer;
    let { locale } = settings;

    return { company, user, errorMessages, locale };
}

export default connect(mapStateToProps, {
    createCompany,
    getCompanyByIdAndAccountId,
    updateCreateCompanyFailureRestart,
    updateCompany,
    getUserByIdAndAccountId
})(CompanyInformationForm);