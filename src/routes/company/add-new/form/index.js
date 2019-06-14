import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import IntlMessages from 'Util/IntlMessages';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Button } from 'reactstrap';
import { isEmpty } from '../../../../util/lodashFunctions';
import { getOnlyUpdatedValues } from '../../../../util/helper';
import { NotificationManager } from 'react-notifications';
import APP_MESSAGES from '../../../../constants/AppMessages';

// redux action
import {
    createCompany,
    updateCompany,
    getCompanyByIdAndAccountId
} from 'Actions/index';

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

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
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
            return NotificationManager.error(<IntlMessages id={'form.company.nothing_changed'} />);
        }
        
        this.props.updateCompany(this.state);
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

    render() {
        return (
        <div className="textfields-wrapper">
            <RctCollapsibleCard heading={<IntlMessages id={'form.company.header'} />}>
            <form noValidate autoComplete="off">
                <div className="row">
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                    <TextField id="name" fullWidth label={<IntlMessages id={'form.company.name'} />} value={this.state.name} onChange={this.handleChange('name')} autoComplete="off"/>
                    </div>
                    <div className="form-group">
                    <TextField id="mobile_phone" fullWidth label={<IntlMessages id={'form.company.mobile_phone'} />} value={this.state.mobile_phone} onChange={this.handleChange('mobile_phone')} autoComplete="off"/>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                    <TextField id="country" fullWidth label={<IntlMessages id={'form.company.country'} />} value={this.state.country} onChange={this.handleChange('country')} autoComplete="off"/>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                    <TextField id="address" fullWidth label={<IntlMessages id={'form.company.address'} />} value={this.state.address} onChange={this.handleChange('address')} autoComplete="off"/>
                    </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xl-3">
                    <div className="form-group">
                    <TextField id="phone_number" fullWidth label={<IntlMessages id={'form.company.phone_number'} />} value={this.state.phone_number} onChange={this.handleChange('phone_number')} autoComplete="off"/>
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
    const { company } = companyReducer;
    const { user } = userReducer;

    return { company, user };
}

export default connect(mapStateToProps, {
    createCompany,
    getCompanyByIdAndAccountId,
    updateCompany
})(CompanyInformationForm);