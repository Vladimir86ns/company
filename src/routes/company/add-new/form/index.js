import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Button } from 'reactstrap';
import { isEmpty } from '../../../../util/lodashFunctions';
import { getOnlyUpdatedValues } from '../../../../util/helper';
import { NotificationManager } from 'react-notifications';
import FormErrorMessage from '../../../../components/Form/FormErrorMessage';

// redux action
import {
    createCompany,
    updateCompany,
    updateCreateCompanyFailureRestart,
    getCompanyByIdAndAccountId
} from 'Actions/index';

const RESET_TIME_VALIDATION_MESSAGE = 5000;

class CompanyInformationForm extends React.Component {

    state = {
        name: '',
        address: '',
        country: '',
        mobile_phone: '',
        phone_number: ''
    };

    componentWillMount() {
        let {company , user} = this.props;

        if (isEmpty(company) && user.company_settings_done) {
            this.props.getCompanyByIdAndAccountId();
        } else {
            this.updateStateWithCompanyInfo(company);
        }
    }

    componentWillUpdate(nextProps) {
        if (isEmpty(this.props.company) && !isEmpty(nextProps.company)) {
            this.updateStateWithCompanyInfo(nextProps.company);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.errorMessages !== this.props.errorMessages) {
            this.setTimeToRemoveErrorMessage(RESET_TIME_VALIDATION_MESSAGE);
        }
    };

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
        let { user, company} =  this.props;

        if (!user.company_settings_done) {
            this.props.createCompany(this.state);
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
                    </div>
                    <div className="form-group">
                        <TextField id="mobile_phone" fullWidth label={<IntlMessages id={'form.company.mobile_phone'} />} value={this.state.mobile_phone} onChange={this.handleChange('mobile_phone')} autoComplete="off"/>
                        <FormErrorMessage message={errorMessages.mobile_phone} />
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                        <TextField id="country" fullWidth label={<IntlMessages id={'form.company.country'} />} value={this.state.country} onChange={this.handleChange('country')} autoComplete="off"/>
                        <FormErrorMessage message={errorMessages.country} />
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                        <TextField id="address" fullWidth label={<IntlMessages id={'form.company.address'} />} value={this.state.address} onChange={this.handleChange('address')} autoComplete="off"/>
                        <FormErrorMessage message={errorMessages.address} />
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                        <TextField id="phone_number" fullWidth label={<IntlMessages id={'form.company.phone_number'} />} value={this.state.phone_number} onChange={this.handleChange('phone_number')} autoComplete="off"/>
                        <FormErrorMessage message={errorMessages.phone_number} />
                    </div>
                </div>
                </div>
                <Button onClick={ () => this.handleCreateOrUpdate()} className="mr-10 mb-10" color="primary">{ this.props.user.company_settings_done ? 'Update' : 'Create'}</Button>
            </form>
            </RctCollapsibleCard>
        </div>
        );
    }
}

function mapStateToProps({ companyReducer, userReducer }) {
    const { company, errorMessages } = companyReducer;
    const { user } = userReducer;

    return { company, user, errorMessages };
}

export default connect(mapStateToProps, {
    createCompany,
    getCompanyByIdAndAccountId,
    updateCreateCompanyFailureRestart,
    updateCompany
})(CompanyInformationForm);