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
import laravelApi from '../../../../api/index';
import { getCompanyID } from 'Util/local-storage';
import { DatePicker } from 'material-ui-pickers';

// redux action
import {
    createEmployee,
    createUpdateEmployeeFailureRestart,
    resetEmployee,
    resetStateAndFetchID
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
     * Set up validation message language.
     */
    componentWillMount() {
        if (this.props.locale) {
            this.validator = setUpValidationMessageLanguage(this.props.locale.locale);
        }

        this.getRecommendedEmployeeId();
    };

    /**
     * Reset state when new employee is created, and fetch new recommended id.
     * 
     * @param {object} nextProps 
     */
    componentWillUpdate(nextProps) {
        if (nextProps.resetStateFetchID) {
            this.resetStateAndFetchID();
            this.props.resetStateAndFetchID();
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
                event.format('YYYY-MM-DD') :
                event.target.value,
        });
    };

    /**
     * Create new employee.
     */
    handleCreateOrUpdate() {
        if (this.validator.allValid()) {
            return this.props.createEmployee(this.state);
        } else {
            NotificationManager.error(APP_MESSAGES.error.validationMessage);
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

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
     * Reset state when new employee is created, and fetch new employee ID.
     *
     */
    resetStateAndFetchID() {
        var newState = {};

        Object.keys(this.state).forEach((key) => {
            newState[key] = '';
        });

        this.setState(newState);
        this.getRecommendedEmployeeId();
        this.validator.hideMessages();
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

    /**
     * Get value for hire date.
     */
    getValueForDatePicker() {
        if (isEmpty(this.state.hire_date)) {
            this.setState({
                hire_date: moment().format('YYYY-MM-DD')
            });
            return moment();
        }

        return (typeof this.state.hire_date === moment) ? this.state.hire_date : moment(this.state.hire_date);
    }

    /**
     * Get recommended employee id.
     */
    async getRecommendedEmployeeId() {
        let data = await laravelApi.get(`account/company/${getCompanyID()}/employee/get_recommended_id`)
            .then(res => res)
            .catch(err => err.response);

        if (data.status === 200) {
            this.setState({employee_company_id: data.data.data.employee_company_id});
        }
    }

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
                                <DatePicker
                                    label={<IntlMessages id={`form.employee.hire_date`} />}
                                    animateYearScrolling={false}
                                    leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                                    rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                                    fullWidth
                                    value={this.getValueForDatePicker()}
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
                        color="primary">Create
                    </Button>
                </form>
            </RctCollapsibleCard>
        </div>
        );
    }
}

function mapStateToProps({ employeeReducer, settings }) {
    const { employee, errorMessages, resetStateFetchID } = employeeReducer;
    let { locale } = settings;

    return { employee, errorMessages, locale, resetStateFetchID };
}

export default connect(mapStateToProps, {
    createEmployee,
    createUpdateEmployeeFailureRestart,
    resetEmployee,
    resetStateAndFetchID
})(EmployeeInformationForm);