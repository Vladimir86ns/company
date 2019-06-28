import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Button } from 'reactstrap';
import { isEmpty } from '../../../../util/lodashFunctions';
import { NotificationManager } from 'react-notifications';
import { setUpValidationMessageLanguage, getValidationMessage } from 'Util/helper';
import FormErrorMessage from 'Components/Form/FormErrorMessage';
import APP_MESSAGES from 'Constants/AppMessages';
import { fieldNamesAndRules, RESET_TIME_VALIDATION_MESSAGE } from '../../constants';
import moment from 'moment';

// redux action
import {
    createEmployee,
    createUpdateEmployeeFailureRestart,
    resetEmployee
} from 'Actions/index';

class EmployeeInformationForm extends React.Component {

    state = {
        first_name: '',
        last_name: '',
        email: '',
        country: '',
        city: '',
        address: '',
        mobile_phone: '',
        phone_number: '',
        hire_date: '',
        employee_company_id: ''
    };

    /**
     * Update state if has employee informations.
     * Set up validation message language.
     */
    componentWillMount() {
        let { employee } = this.props;

        if (!isEmpty(employee)) {
            this.updateStateWithEmployeeInfo(employee);
        }

        if (this.props.locale) {
			this.validator = setUpValidationMessageLanguage(this.props.locale.locale);
		}
    };

    /**
     * Update state when employee has information.
     * 
     * @param {object} nextProps 
     */
    componentWillUpdate(nextProps) {
        if (isEmpty(this.props.employee) && !isEmpty(nextProps.employee)) {
            this.updateStateWithEmployeeInfo(nextProps.employee);
        }
    };

    /**
     * Reset validation message get from server.
     * 
     * @param {object} prevProps 
     */
    componentDidUpdate(prevProps) {
        if (prevProps.errorMessages !== this.props.errorMessages) {
            this.setTimeToRemoveErrorMessage(RESET_TIME_VALIDATION_MESSAGE);
        }
    };

    /**
     * Set empty employee information in state, before live component.
     */
    componentWillUnmount() {
        this.props.resetEmployee();
    }

    /**
     * Update the state.
     */
    handleChange = (key) => event => {
        this.setState({
            [key]: (key === 'hire_date') ? 
                moment(event.target.value).format('YYYY-MM-DD') :
                event.target.value,
        });
    };

    /**
     * Create new employee, or update.
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
     * Update or create employee, if validation pass.
     */
    validationPass() {
        let { employee } = this.props;

        if (isEmpty(employee)) {
            this.props.createEmployee(this.state);
            return;
        }
    }

    /**
     * Update state with employee info.
     *
     */
    updateStateWithEmployeeInfo(employee) {
        var newState = {...this.state};

        Object.keys(employee).forEach((key) => {
            if (typeof this.state[key] !== 'undefined') {
                newState[key] = employee[key] ? employee[key] : '';
            }
        });

        this.setState(newState);
    };

    /**
     * Set time to remove validation messages.
    */
    setTimeToRemoveErrorMessage(time) {
        setTimeout(() => {
            this.props.createUpdateEmployeeFailureRestart();
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

    render() {
        let { errorMessages } = this.props;

        return (
        <div className="textfields-wrapper">
            <RctCollapsibleCard heading={<IntlMessages id={'form.employee.header'} />}>
                <form noValidate autoComplete="off">
                    <div className="row">
                        {fieldNamesAndRules.map((field, i) => {
                            return (
                                <div className="col-sm-6 col-md-6 col-xl-3" key={i}>
                                    <div className="form-group">
                                        <TextField 
                                            id={field.name} 
                                            fullWidth 
                                            label={<IntlMessages id={`form.employee.${field.name}`} />}
                                            value={this.state[field.name]}
                                            onChange={this.handleChange(field.name)}
                                            autoComplete="off"/>
                                        <FormErrorMessage message={errorMessages[field.name]} />
                                        { this.getValidationMessage(field.name, field.rule) }
                                    </div>
                                </div>
                            );
                        })}
                        <div className="col-sm-6 col-md-6 col-xl-3">
                            <div className="form-group">
                                <TextField
                                    id="date"
                                    label={<IntlMessages id={`form.employee.hire_date`} />}
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChange('hire_date')}
                                />
                                <FormErrorMessage message={errorMessages.hire_date} />
                                { this.getValidationMessage('hire_date', 'required') }
                            </div>
                        </div>
                    </div>
                    <Button 
                        onClick={ () => this.handleCreateOrUpdate()} 
                        className="mr-10 mb-10" 
                        color="primary">
                            { isEmpty(this.props.employee) ? 'Create' : 'Update'}
                        </Button>
                </form>
            </RctCollapsibleCard>
        </div>
        );
    }
}

function mapStateToProps({ employeeReducer, settings }) {
    const { employee, errorMessages } = employeeReducer;
    let { locale } = settings;

    return { employee, errorMessages, locale };
}

export default connect(mapStateToProps, {
    createEmployee,
    createUpdateEmployeeFailureRestart,
    resetEmployee
})(EmployeeInformationForm);